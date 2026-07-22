import db from "#db/client";
/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const query = `
  INSERT INTO employees (name, birthday, salary)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  const response = await db.query(query, [name, birthday, salary]);
  return response.rows[0];
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const getAllQuery = `
  SELECT * FROM employees
  `;
  const { rows: response } = await db.query(getAllQuery);
  return response;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const getQuery = `
  SELECT *
  FROM employees
  WHERE id = $1
  `;
  const {
    rows: [response],
  } = await db.query(getQuery, [id]);
  return response;
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const updateQuery = `
  UPDATE employees 
  SET 
    name = $2,
    birthday = $3,
    salary = $4
  WHERE id = $1
  RETURNING *
  `;
  const {
    rows: [response],
  } = await db.query(updateQuery, [id, name, birthday, salary]);
  return response;
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const deleteQuery = `
  DELETE FROM employees
  WHERE id = $1
  RETURNING *`;
  const {
    rows: [response],
  } = await db.query(deleteQuery, [id]);
  return response;
}
