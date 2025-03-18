
class HashMap {

    constructor() {
        this.loadFactor = .75;
        this.capacity = 16;
        this.buckets = [];
        this._length = 0;
    };


    get length() {
        return this._length;
    };


    #hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i += 1) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    };


    #growHashMap(length) {
        const entries = this.entries();
        this.buckets = [];
        this.capacity = this.capacity * 2;

        for (let entry of entries) {
            const key = entry[0];
            const value = entry[1];
            this.set(key, value);
        }
        this._length = length;
    };


    #setEntry(entry, key, value) {
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
        this._length += 1;
    };


    set(key, value) {
        const hash = this.#hash(key);
        const entry = this.buckets[hash];

        if (entry === undefined) {
            this.buckets[hash] = {"key": key, "value": value, "next": null};
            this._length += 1;
        } else {
            this.#setEntry(entry, key, value);
        }

        if (this._length > (this.capacity * this.loadFactor)) {
            this.#growHashMap(this._length);
        }
    };


    #getEntry(entry, key) {
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
        const hash = this.#hash(key);
        const entry = this.buckets[hash];

        if (entry === undefined) {
            return null;
        }

        return this.#getEntry(entry, key);
    };


    has(key) {
        return this.get(key) !== null;
    };


    #removeEntry(entry, key, hash) {
        if (entry.key === key) {
            entry = entry.next;
            entry = (entry === null) ? undefined : entry;
            this.buckets[hash] = entry;
            this._length -= 1;
            return true;
        }

        let current = entry;

        while (current.next !== null) {
            if (current.next.key === key) {
                current.next = current.next.next;
                this._length -= 1;
                return true;
            }
            current = current.next;
        }

        return false;
    };


    remove(key) {
        const hash = this.#hash(key);
        const entry = this.buckets[hash];

        if (entry === undefined) {
            return false;
        }

        return this.#removeEntry(entry, key, hash);
    };


    clear() {
        this.buckets = [];
        this.capacity = 16;
        this._length = 0;
    };


    #addEntryKeys(entry, keyArray) {
        let current = entry;

        while (current !== null) {
            keyArray.push(current.key);
            current = current.next;
        }
    };


    keys() {
        const keyArray = [];

        for (let entry of this.buckets) {
            if (entry !== undefined) {
                this.#addEntryKeys(entry, keyArray);
            }
        }

        return keyArray;
    };


    #addEntryValues(entry, valueArray) {
        let current = entry;

        while (current !== null) {
            valueArray.push(current.value);
            current = current.next;
        }
    };


    values() {
        const valueArray = [];

        for (let entry of this.buckets) {
            if (entry !== undefined) {
                this.#addEntryValues(entry, valueArray);
            }
        }

        return valueArray;
    };


    #addEntries(entry, entriesArray) {
        let current = entry;

        while (current !== null) {
            entriesArray.push([current.key, current.value]);
            current = current.next;
        }
    };


    entries() {
        const entriesArray = [];

        for (let entry of this.buckets) {
            if (entry !== undefined) {
                this.#addEntries(entry, entriesArray);
            }
        }

        return entriesArray;
    };
};


const hashMap = new HashMap()

console.log(hashMap.buckets)


hashMap.set("apple", "red")
hashMap.set("banana", "yellow")
hashMap.set("carrot", "orange")
hashMap.set("dog", "brown")
hashMap.set("elephant", "gray")
hashMap.set("frog", "green")
hashMap.set("grape", "purple")
hashMap.set("hat", "black")
hashMap.set("ice cream", "white")
hashMap.set("jacket", "blue")
hashMap.set("kite", "pink")
hashMap.set("lion", "golden")


console.log(hashMap.buckets)
console.log(hashMap.length)

hashMap.set("jacob", 5)
hashMap.set("jAcob", 8)
hashMap.set("jaCob", 19)
console.log(hashMap.length)
hashMap.set("job", 7)
console.log(hashMap.get("job"))

console.log(hashMap.buckets)
hashMap.remove("jaCob")

// console.log(hashMap.keys())
// console.log(hashMap.values())
// console.log(hashMap.entries())