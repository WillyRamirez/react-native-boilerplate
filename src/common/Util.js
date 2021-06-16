export const getValidFields = (validFields, key, isValid) => {
  let fields = [...validFields];
  if (isValid) {
    if (!fields.includes(key)) {
      fields.push(key);
    }
  } else {
    fields = fields.filter(el => el !== key);
  }

  return fields
}
