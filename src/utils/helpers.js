export const convertToUppercase = (str) => (str ? str.toUpperCase() : str)

export const formatDateAndTime = (date, returnType = 'date', userOptions = {}) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    ...userOptions,
  }
  const checkFormatDate = (originalDate) => {
    // Check format is UTC
    const patternUTC = /(\d{4})-([01]\d)-([0-3]\d)T(\s?)([0-2]\d):([0-5]\d):([0-5]\d)\.\d+([+-][0-2]\d:[0-5]\d|Z)/
    if (typeof originalDate === 'string' && originalDate.match(patternUTC)) {
      return originalDate
    }

    // Check format is YYYY(/-.)MM(/-.)DD
    const patternYYYMMDD = /(\d{4})(\/|-|\.)(\d{2})(\/|-|\.)(\d{2})/
    if (typeof originalDate === 'string' && originalDate.match(patternYYYMMDD)) {
      return originalDate.replace(patternYYYMMDD, '$1-$5-$3 00:00')
    }

    // Check format is TIMESTAMP
    if (typeof originalDate === 'number') {
      const parsed = parseFloat(originalDate)
      if (!Number.isNaN(parsed) && Number.isFinite(parsed) && /^\d+\.?\d+$/.test(originalDate)) {
        return originalDate * 1000
      }
    }

    // Check format is PT-BR DD(/-.)MM(/-.)YYYY
    const patternDDMMYYYY = /(\d{2})(\/|-|\.)(\d{2})(\/|-|\.)(\d{4})/
    if (typeof originalDate === 'string' && originalDate.match(patternDDMMYYYY)) {
      return originalDate.replace(patternDDMMYYYY, '$5-$3-$1')
    }

    return originalDate
  }

  const newDate = new Date(checkFormatDate(date))
  if (date === '2019/26/02') console.log(date, newDate)
  switch (returnType) {
    case 'date':
      return newDate.toLocaleDateString('pt-BR')
    case 'time':
      return newDate.toLocaleTimeString('pt-BR')
    default:
      return newDate.toLocaleString('pt-BR', options)
  }
}

export const formatPhoneNumber = (phoneNumber) => phoneNumber.replace(/(\d{2})(\d{2})(\d{4})(\d{5})/, '+$1 ($2) $3-$4')

export default {}
