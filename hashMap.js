
class HashMap {

    constructor() {
        this.load_factor = .75;
        this.capacity = 16;
        this.buckets = [];
        this._length = 0;
    };


    get length() {
        return this._length;
    };


    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i += 1) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    };


    setEntry(entry, key, value) {
        let current = entry;
        while (true) {
            if (current.key === key) {
                current.value = value;
                return;
            }
            if (current.next === null) {
                break;
            }
            current = current.next;
        }

        current.next = {"key": key, "value": value, "next": null};
    };


    set(key, value) {
        const hash = this.hash(key);
        const entry = this.buckets[hash];

        if (entry === undefined) {
            this.buckets[hash] = {"key": key, "value": value, "next": null};
            return;
        }

        this.setEntry(entry, key, value);
    };


    getEntry(entry, key) {
        let current = entry;

        while (current !== null) {
            if (current.key === key) {
                return current.value;
            }
            current = current.next;
        }

        return null;
    };


    get(key) {
        const hash = this.hash(key);
        const entry = this.buckets[hash];

        if (entry === undefined) {
            return null;
        }

        return this.getEntry(entry, key);
    };


    has(key) {
        return this.get(key) !== null;
    };


    removeEntry(entry, key, hash) {
        if (entry.key === key) {
            entry = entry.next;
            entry = (entry === null) ? undefined : entry;
            this.buckets[hash] = entry;
            return true;
        }

        let current = entry;

        while (current.next !== null) {
            if (current.next.key === key) {
                current.next = current.next.next;
                return true;
            }
            current = current.next;
        }

        return false;
    };


    remove(key) {
        const hash = this.hash(key);
        const entry = this.buckets[hash];

        if (entry === undefined) {
            return false;
        }

        return this.removeEntry(entry, key, hash);
    };
};


const hashMap = new HashMap()

console.log(hashMap.buckets)

hashMap.set("jacob", 5)
hashMap.set("jAcob", 8)
hashMap.set("jaCob", 19)
console.log(hashMap.length)

console.log(hashMap.buckets)

hashMap.remove("jAcob")

console.log(hashMap.buckets)

hashMap.remove("jacob")

console.log(hashMap.buckets)

console.log(hashMap.buckets[1])
