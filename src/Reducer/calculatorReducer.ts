import { evaluate } from 'mathjs'

export type State = {
  calculation: string
  result: string
  error: boolean // Thêm thuộc tính để theo dõi lỗi
  isClearActive: boolean // Thêm thuộc tính để theo dõi trạng thái của nút C/AC
}

export type Action =
  | { type: 'ADD_CHAR'; payload: string }
  | { type: 'CLEAR' }
  | { type: 'EVALUATE' }
  | { type: 'DELETE_LAST' }
  | { type: 'PERCENTAGE' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'SET_ERROR'; payload: boolean } // Thêm action để thiết lập lỗi

export const initialState: State = {
  calculation: '0',
  result: 'Ans = 0',
  error: false, // Khởi tạo lỗi là false
  isClearActive: false // Mặc định là AC
}

export function calculatorReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_CHAR': {
      if (state.error) {
        return state // Không thêm ký tự khi có lỗi
      }

      const newClearState = state.calculation !== '0' || action.payload !== '.' ? true : state.isClearActive

      if (state.calculation.length >= 26) {
        return state // Giới hạn tối đa 26 ký tự
      }

      const currentCalculation = state.calculation
      const lastChar = currentCalculation.slice(-1)

      // Kiểm tra nếu ký tự mới là phép toán
      const isOperator = ['+', '-', '*', '/'].includes(action.payload)

      // Nếu ký tự mới là phép toán
      if (isOperator) {
        // Không cho phép thêm phép toán giống nhau liên tiếp
        if (lastChar === action.payload) {
          return state // Không cho phép thêm phép toán giống nhau liên tiếp
        }

        // Không cho phép phép toán ở vị trí đầu tiên
        if (currentCalculation === '0' || !['+', '-', '*', '/'].includes(lastChar)) {
          return {
            ...state,
            calculation: state.calculation + action.payload,
            isClearActive: newClearState
          }
        }

        // Nếu ký tự cuối cùng cũng là phép toán, thay thế phép toán cuối cùng
        if (['+', '-', '*', '/'].includes(lastChar)) {
          return {
            ...state,
            calculation: currentCalculation.slice(0, -1) + action.payload,
            isClearActive: newClearState
          }
        }
      } else {
        // Kiểm tra nếu ký tự mới là dấu chấm
        if (action.payload === '.') {
          // Tách phần số cuối cùng
          const parts = currentCalculation.split(/[+\-*/]/)
          const lastPart = parts.pop() || ''

          // Không cho phép thêm dấu chấm nếu phần số cuối cùng đã có dấu chấm
          if (lastPart.includes('.')) {
            return state
          }

          // Nếu không có dấu chấm trong phần số cuối cùng, cho phép thêm dấu chấm
          if (state.calculation === '0') {
            return {
              ...state,
              calculation: '0.',
              isClearActive: newClearState
            }
          }

          return {
            ...state,
            calculation: state.calculation + action.payload,
            isClearActive: newClearState
          }
        }

        // Nếu không phải phép toán hoặc dấu chấm, thêm ký tự mới vào phép tính
        if (state.calculation === '0' && action.payload !== '.') {
          return {
            ...state,
            calculation: action.payload,
            isClearActive: newClearState
          }
        }
      }

      return {
        ...state,
        calculation: state.calculation + action.payload,
        isClearActive: newClearState
      }
    }

    case 'CLEAR':
      return {
        ...state,
        calculation: '0',
        result: 'Ans = 0',
        error: false, // Đặt lại lỗi khi xóa
        isClearActive: false // Trở về AC sau khi xóa
      }
    case 'EVALUATE':
      try {
        if (state.calculation.includes('/0')) {
          return {
            ...state,
            result: 'Cannot divide by zero',
            error: true,
            isClearActive: true // Switch to AC on error
          }
        }

        const result = evaluate(state.calculation)

        // Round the result to a fixed number of decimal places
        const roundedResult = parseFloat(result.toFixed(10)) // Adjust the number of decimal places as needed

        if (!isFinite(roundedResult)) {
          return {
            ...state,
            result: 'Infinity',
            error: true,
            isClearActive: true // Switch to AC on infinity
          }
        }

        return {
          ...state,
          result: `${state.calculation} = ${result}`,
          calculation: roundedResult.toString(),
          error: false,
          isClearActive: true // Switch to AC on success
        }
      } catch {
        return {
          ...state,
          result: 'Error',
          error: true,
          isClearActive: true // Switch to AC on error
        }
      }

    case 'PERCENTAGE':
      try {
        const result = evaluate(`${state.calculation} / 100`)
        return {
          ...state,
          result: `${state.calculation} % = ${result}`,
          calculation: result.toString(),
          error: false,
          isClearActive: true // Chuyển sang AC khi thành công
        }
      } catch {
        return {
          ...state,
          result: 'Error',
          error: true,
          isClearActive: true // Chuyển sang AC khi lỗi
        }
      }
    case 'TOGGLE_SIGN':
      try {
        const value = evaluate(state.calculation)
        const toggledValue = -value
        return {
          ...state,
          calculation: toggledValue.toString(),
          result: `${state.calculation} ± = ${toggledValue}`,
          error: false,
          isClearActive: true // Chuyển sang AC khi thành công
        }
      } catch {
        return {
          ...state,
          result: 'Error',
          error: true,
          isClearActive: true // Chuyển sang AC khi lỗi
        }
      }
    case 'DELETE_LAST':
      return {
        ...state,
        calculation: state.calculation.length > 1 ? state.calculation.slice(0, -1) : '0',
        error: false,
        isClearActive: state.calculation.length > 1 // Chuyển sang C nếu có nhiều hơn 1 ký tự
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isClearActive: action.payload // Chuyển sang AC khi có lỗi
      }
    default:
      return state
  }
}
