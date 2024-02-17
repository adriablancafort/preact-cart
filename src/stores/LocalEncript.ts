export function getLocalEncript(key: string) {
  return typeof localStorage !== 'undefined'
    ? JSON.parse(localStorage.getItem(key)!)
    : null;
};

export function setLocalEncript(key: string, value: any) {
  typeof localStorage !== 'undefined' 
    ? localStorage.setItem(key, JSON.stringify(value)) 
    : null;
};