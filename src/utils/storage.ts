class InMemoryStorage implements Storage {
  private store: Record<string, string> = {};

  get length(): number {
    return Object.keys(this.store).length;
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return key in this.store ? this.store[key] : null;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }
}

let safeLocalStorage: Storage;
let safeSessionStorage: Storage;

try {
  const testKey = "__storage_test__";
  window.localStorage.setItem(testKey, testKey);
  window.localStorage.removeItem(testKey);
  safeLocalStorage = window.localStorage;
} catch (e) {
  console.warn("localStorage is not accessible in this context. Falling back to in-memory storage.", e);
  safeLocalStorage = new InMemoryStorage();
}

try {
  const testKey = "__storage_test__";
  window.sessionStorage.setItem(testKey, testKey);
  window.sessionStorage.removeItem(testKey);
  safeSessionStorage = window.sessionStorage;
} catch (e) {
  console.warn("sessionStorage is not accessible in this context. Falling back to in-memory storage.", e);
  safeSessionStorage = new InMemoryStorage();
}

export { safeLocalStorage, safeSessionStorage };
