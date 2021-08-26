DROP TABLE clean_real_estate;
CREATE TABLE clean_real_estate (
	address varchar,
	city varchar,
	state_or_province text,
	zip_code int,
	price int,
	beds int,
	baths int,
	square_feet varchar,
	lot_size varchar,
	year_built varchar,
	days_on_market varchar,
	price_per_square_feet varchar,
	redfin_url varchar PRIMARY KEY,
	mls varchar,
	latitude varchar,
	longitude varchar,
	average_school_rating varchar,
	FOREIGN KEY (city) REFERENCES crime_cities_coords(city)
);
SELECT * FROM clean_real_estate;

DROP TABLE crime_cities_coords;
CREATE TABLE crime_cities_coords (
	department varchar,
	state varchar,
	ori varchar,
	city varchar PRIMARY KEY,
	latitude varchar,
	longitude varchar,
	agg_assault int,
	sex_offenses int,
	manslaughter_neg int,
	murder_and_nonneg_man int,
	rape int,
	robbery int,
	simp_assault int,
	human_trafficking_commercial_sa int,
	human_trafficking_invol_ser int,
	offenses_Total int
);

-- ALTER TABLE crime_cities_coords
-- ALTER COLUMN Ori TYPE varchar,
-- ALTER COLUMN Latitude TYPE varchar,
-- ALTER COLUMN Longitude TYPE varchar,
-- ALTER COLUMN Agg_Assult TYPE varchar,
-- ALTER COLUMN Sex_Offences TYPE varchar,
-- ALTER COLUMN Manslaughter_Neg TYPE int,
-- ALTER COLUMN Murder_and_Nonneg_Man TYPE int,
-- ALTER COLUMN Rape TYPE int,
-- ALTER COLUMN Robbery TYPE int,
-- ALTER COLUMN Simp_Assult TYPE int,
-- ALTER COLUMN Humman_Trafficking_Commercial_SA TYPE int,
-- ALTER COLUMN Humman_Trafficking_Invol_Ser TYPE int,
-- ALTER COLUMN Offences_Total TYPE int;
SELECT * FROM crime_cities_coords;


DROP TABLE school_data;
CREATE TABLE school_data (
	url varchar,
	school_name varchar,
	school_rating varchar,
	school_type varchar,
	school_grades varchar,
	PRIMARY KEY(url,school_name),
	FOREIGN KEY (url) REFERENCES clean_real_estate(redfin_url)
);
SELECT * FROM school_data;