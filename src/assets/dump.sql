CREATE TABLE IF NOT EXISTS favouritestable(
    coinId TEXT PRIMARY KEY,
    coinSymbol TEXT,
    coinName TEXT,
    coinImage TEXT,
    coinPrice DECIMAL(7, 2),
    coinDescription TEXT
);
