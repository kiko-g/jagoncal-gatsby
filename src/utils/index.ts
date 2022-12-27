const daysDifference = (dateString: string) => {
  let now = new Date()
  let date = new Date(dateString)
  let difference = (now.getTime() - date.getTime()) / (1000 * 3600 * 24)

  return difference
}


export { daysDifference }
