const diffInDays = (endDate, check) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const remDays = Math.floor((endDate - currentDate) / (24 * 60 * 60 * 1000));
    if (check) return remDays
    if(remDays <0 ){
      return 'Overdue'
    } else {
      return `${remDays} Days left`
    }
};

const genDeadline = (date) => {
    let deadline = date.substr(0, 10).split('-').reverse().join('-')
    return deadline
  }

export {diffInDays,genDeadline}