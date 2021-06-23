const orderArray = (arr, key, isAscend) => {
    if (isAscend === undefined) {
        isAscend = true;
    }
    if (!Array.isArray(arr) || !arr.length) {
        throw new Error(`No contributor found.`);
    }
    if (!arr[0][key]) {
        throw new Error(`Proper sort key reqiured.`);
    }
    return arr.sort((a, b) => {
        if (a[key] < b[key]) {
            return isAscend ? -1 : 1;
        }
        if (a[key] > b[key]) {
            return isAscend ? 1 : -1;
        }
        return 0;
    })
}

module.exports = {
    orderArray,
}