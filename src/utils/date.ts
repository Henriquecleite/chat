const getDoubleDigitsDay = (dayNumber) => {
  const dayNumberAsString = dayNumber.toString()

  const doubleDigitsDay =
    dayNumberAsString.length === 1 ? `0${dayNumberAsString}` : dayNumberAsString

  return doubleDigitsDay
}

const getDoubleDigitsMonth = (monthNumber) => {
  const monthNumberAsString = monthNumber.toString()

  const doubleDigitsMonth =
    monthNumberAsString.length === 1
      ? `0${monthNumberAsString}`
      : monthNumberAsString

  return doubleDigitsMonth
}

const getYearMonthDayNumber = (timestamp: number) => {
  const date = new Date(timestamp)

  const year = date.getFullYear()

  const month = getDoubleDigitsMonth(date.getMonth() + 1)

  const day = getDoubleDigitsDay(date.getDate())

  return `${year}${month}${day}`
}

const convertMonthNumberToWords = (month) => {
  switch (month) {
    case '01':
      return 'Janeiro'
    case '02':
      return 'Fevereiro'
    case '03':
      return 'Março'
    case '04':
      return 'Abril'
    case '05':
      return 'Maio'
    case '06':
      return 'Junho'
    case '07':
      return 'Julho'
    case '08':
      return 'Agosto'
    case '09':
      return 'Setembro'
    case '10':
      return 'Outubro'
    case '11':
      return 'Novembro'
    case '12':
      return 'Dezembro'
    default:
      return '-'
  }
}

const convertYearMonthDayNumberToWords = (yearMonthDay: string) => {
  const year = yearMonthDay.slice(0, 4)

  const month = convertMonthNumberToWords(yearMonthDay.slice(4, 6))

  const day = parseInt(yearMonthDay.slice(6), 10)

  return `${day} de ${month} de ${year}`
}

export { getYearMonthDayNumber, convertYearMonthDayNumberToWords }
