import Resource from '@/api/resource';

class Customer extends Resource {
    constructor() {
        super('customers');
    }
}

export {Customer as default};
