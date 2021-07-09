const getRandEl = arr => {
    return arr[Math.floor(Math.random() * arr.length)];
};

export { getRandEl };