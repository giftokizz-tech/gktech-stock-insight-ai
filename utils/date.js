function formatDate(date) {
    const yyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyy}-${mm}-${dd}`;
}

function getDateDaysAgo(days) {
    const now = new Date();
    now.setDate(now.getDate() - days);
    return formatDate(now);
}

export const dates = {
    startDate: getDateDaysAgo(3),
    endDate: getDateDaysAgo(1)
}
