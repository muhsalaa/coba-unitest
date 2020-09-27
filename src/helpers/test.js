export function hexToRGBString(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )})`
    : null;
}

export const findByTestAttr = (wrapper, val, elem = '') => {
  return wrapper.find(`${elem}[data-testid='${val}']`);
};
