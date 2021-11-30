create TABLE users(
  id SERIAL PRIMARY KEY,
  login VARCHAR(255),
  password VARCHAR(255),
  age INTEGER,
  isdeleted BOOLEAN
);

Insert Into users Values
('1', 'John', 'qwerty1ER', '26', false),
('2', 'Paul', 'qwerty1ER4', '27', false),
('3', 'Ringo', 'qwerty1ER2', '27', false),
('4', 'George', 'qwerty3GGG', '27', false),
('5', 'Kurt', 'inBloom1', '27', false),
('6', 'Krist', 'inBloom2', '27', false),
('7', 'Dave', 'inBloom3', '27', false),
('8', 'Jack', 'NationArmy7', '30', false),
('9', 'Mag', 'NationArmy77', '31', false),
('10', 'Antony', 'cantStop2000', '40', false),
('11', 'JohnF', 'cantStop20001', '39', false),
('12', 'Flea', 'cantStop20002', '41', false),
('13', 'Chad', 'cantStop20003', '50', false),
('14', 'James', 'frantic1', '58', false),
('15', 'Lars', 'frantic2', '58', false),
('16', 'Kirk', 'frantic3', '58', false),
('17', 'Robert', 'frantic4', '58', false);