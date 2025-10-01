-- Insertar administrador por defecto (username: admin, password: admin123)
-- Nota: En producción, la contraseña debería estar hasheada
INSERT INTO admins (username, password) 
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO NOTHING;

-- Insertar categorías de ejemplo
INSERT INTO categories (name, description, order_index) VALUES
  ('Pollos a la Brasa', 'Nuestros deliciosos pollos a la brasa con receta secreta', 1),
  ('Chifa', 'Auténtica comida china-peruana', 2),
  ('Mostrito', 'Nuestras especialidades de la casa', 3),
  ('Bebidas', 'Refrescos y bebidas para acompañar', 4),
  ('Extras', 'Complementos y guarniciones', 5)
ON CONFLICT DO NOTHING;

-- Insertar algunos platos de ejemplo
INSERT INTO menu_items (category_id, name, description, price, is_available)
SELECT 
  c.id,
  'Pollo a la Brasa Entero',
  'Pollo entero a la brasa con papas fritas y ensalada',
  65.00,
  true
FROM categories c WHERE c.name = 'Pollos a la Brasa'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_available)
SELECT 
  c.id,
  'Medio Pollo a la Brasa',
  'Medio pollo a la brasa con papas fritas y ensalada',
  35.00,
  true
FROM categories c WHERE c.name = 'Pollos a la Brasa'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_available)
SELECT 
  c.id,
  'Cuarto de Pollo',
  'Cuarto de pollo a la brasa con papas fritas',
  20.00,
  true
FROM categories c WHERE c.name = 'Pollos a la Brasa'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_available)
SELECT 
  c.id,
  'Arroz Chaufa de Pollo',
  'Arroz frito al estilo chino con pollo y vegetales',
  25.00,
  true
FROM categories c WHERE c.name = 'Chifa'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_available)
SELECT 
  c.id,
  'Tallarín Saltado',
  'Fideos salteados con carne y vegetales',
  28.00,
  true
FROM categories c WHERE c.name = 'Chifa'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_available)
SELECT 
  c.id,
  'Mostrito Especial',
  'Nuestra especialidad de la casa con pollo y chaufa',
  32.00,
  true
FROM categories c WHERE c.name = 'Mostrito'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_available)
SELECT 
  c.id,
  'Inca Kola 1.5L',
  'Bebida peruana',
  8.00,
  true
FROM categories c WHERE c.name = 'Bebidas'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_available)
SELECT 
  c.id,
  'Papas Fritas',
  'Porción de papas fritas',
  10.00,
  true
FROM categories c WHERE c.name = 'Extras'
ON CONFLICT DO NOTHING;
