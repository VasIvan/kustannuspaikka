CREATE TABLE kustannuspaikka
( 
    kustannuspaikkanumero SERIAL NOT NULL check(kustannuspaikkanumero >= 1 and kustannuspaikkanumero <= 999999) PRIMARY KEY,
    kustannuspaikka_nimi VARCHAR(30) NOT NULL,
    vastuuhenkilon_nimi VARCHAR(40) NOT NULL,
    vuosibudjetti NUMERIC(255,2) NOT NULL,
    toteuma NUMERIC(255,2),
    tietueen_luontiaika TIMESTAMP NOT NULL,
    tietueen_muutosaika TIMESTAMP 
);

INSERT INTO kustannuspaikka (kustannuspaikka_nimi, vastuuhenkilon_nimi, vuosibudjetti, toteuma, tietueen_luontiaika )
 VALUES ('Pekka Oy', 'Pekka Niemi', 212321322.23222, 12132132139.9239, '2007-12-13');

DROP TABLE kustannuspaikka;

SELECT * FROM kustannuspaikka;