import moment from "moment"

export const timeSince = (date) => {
    return moment(date).fromNow()
}

