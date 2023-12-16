import {describe, expect, test} from '@jest/globals';
import {sum} from "../Sum";


//export function sum(a:number, b:number) {
//     return a + b;
// }
describe('sum module', () => {
    it('should be sum of two numbers', () => {
        const a = 5;
        const b = 3;
        const sumOfTwoNumbers = sum(a,b);
        expect(sumOfTwoNumbers).toBe(8);
    });
});