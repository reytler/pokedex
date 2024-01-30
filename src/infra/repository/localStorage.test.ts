import { LocalStorage } from './localStorage';

describe('LocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('find', () => {
    it('should return null if key does not exist', () => {
      const localStorageInstance = new LocalStorage();
      const result = localStorageInstance.find('nonexistentKey');
      expect(result).toBeNull();
    });

    it('should return null if key is expired', () => {
      const localStorageInstance = new LocalStorage();
      localStorage.setItem('expiredKey', 'expiredValue');
      localStorage.setItem('expiredKey:ts', JSON.stringify(Date.now() - 1000));
      const result = localStorageInstance.find('expiredKey');
      expect(result).toBeNull();
    });

    it('should return stored value if key exists and is not expired', () => {
      const localStorageInstance = new LocalStorage();
      const key = 'validKey';
      const value = { data: 'example' };
      localStorage.setItem(key, JSON.stringify(value));
      localStorage.setItem(key + ':ts', JSON.stringify(Date.now() + 1000));
      const result = localStorageInstance.find(key);
      expect(result).toEqual(value);
    });
  });

  describe('create', () => {
    it('should store value and timestamp in localStorage', () => {
      const localStorageInstance = new LocalStorage();
      const key = 'newKey';
      const value = { data: 'example' };

      localStorageInstance.create(value, key);

      const storedValue = localStorage.getItem(key);
      const storedTimestamp = localStorage.getItem(key + ':ts');
      
      expect(JSON.parse(storedValue!)).toEqual(value);
      expect(typeof JSON.parse(storedTimestamp!)).toBe('number');
    });
  });

  describe('delete', () => {
    it('should remove value and timestamp from localStorage', () => {
      const localStorageInstance = new LocalStorage();
      const key = 'keyToDelete';
      const value = { data: 'example' };

      localStorage.setItem(key, JSON.stringify(value));
      localStorage.setItem(key + ':ts', JSON.stringify(Date.now() + 1000));

      localStorageInstance.delete(key);

      const storedValue = localStorage.getItem(key);
      const storedTimestamp = localStorage.getItem(key + ':ts');
      expect(storedValue).toBeUndefined()
      expect(storedTimestamp).toBeUndefined();
    });
  });
});