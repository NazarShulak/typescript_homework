// Створити такі класи:
//1) Депутат
// - імя
// - вік
// - стать
// - ступінь чесності (0-100)
// - мінімальна сума хабаря

enum EGender {
    MALE = 'Male',
    FEMALE = 'Female'
}

class Deputy {
    public name: string;
    public age: number;
    public gender: EGender;
    public honesty: number;
    public minBribe: number

    constructor(name: string, age: number, gender: EGender, honesty: number, minBribe: number) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.honesty = honesty;
        this.minBribe = minBribe;
    }

    giveBribe(money: number): void {
        if (this.honesty < 50) {
            const goodBribe = this.minBribe + this.minBribe * this.honesty / 100;
            if (money < this.minBribe) {
                console.log('No, I am honest man')
            }
            if (money >= this.minBribe && money < goodBribe) {
                console.log('I don`t know, I have to think')
            }
            if (money >= goodBribe) {
                console.log('Give me my money!!!')
            }
        } else {
            console.log('The person is honest')
        }
    }
}

const dep1 = new Deputy('Ivan', 45, EGender.MALE, 43, 1000);
const dep2 = new Deputy('Olya', 37, EGender.FEMALE, 67, 1500);
const dep3 = new Deputy('Alex', 54, EGender.MALE, 17, 500);
const dep4 = new Deputy('Max', 33, EGender.MALE, 74, 10000);

// 2) Партія
// - назва
// - голова (Депутат)
// - члени партії (Масив депатутатів)

class Fraction {
    public name: string;
    public mainBoss: Deputy;
    public members: Array<Deputy>;

    constructor(name: string, mainBoss: Deputy, members: Array<Deputy>) {
        this.name = name;
        this.mainBoss = mainBoss;
        this.members = members;
    }

    addDeputy(deputy: Deputy) {
        this.members.push(deputy);
    }
    removeDeputy(name: string) {
        for (let i = 0; i < this.members.length; i++) {
            if (this.members[i].name === name) {
                delete this.members[i];
            }
        }
    }
    showAllDeputies(): void {
        this.members.forEach(deputy => console.log(deputy));
    }

    showTheBiggestBribeMan() {
        let bribeHonesty = 100;
        let bribe = {};
        this.members.forEach(deputy => {
            if (deputy.honesty < bribeHonesty) {
                bribeHonesty = deputy.honesty;
                bribe = deputy;
            }
        })
        console.log(bribe)
    }

    showAllBribes(): void {
        this.members.forEach(deputy => {
            if (deputy.honesty < 50) {
                console.log(deputy)
            }
        })
    }


}

const frac = new Fraction('new one', dep1, [dep1, dep2, dep3])

class Rada {
    protected fractions: Array<Fraction> = [];

    constructor(fractions: Array<Fraction>) {
        this.fractions = fractions;
    }

    createFrac(name: string, mainBoss: Deputy, members: Array<Deputy>) {
        const frac = new Fraction(name, mainBoss, members);
        this.fractions.push(frac);

    }

    removeFraction(name: string) {
        for (let i = 0; i < this.fractions.length; i++) {
            if (this.fractions[i].name === name) {
                delete this.fractions[i];
            }
        }
    }

    showAllFractions(): void {
        this.fractions.forEach(value => console.log(value))
    }


    showSpecificFraction(name: string): void {
        const fraction = this.fractions.filter(fraction => fraction.name === name);
        console.log(fraction)
    }

    showTheBiggestBribeMan() {
        let bribeHonesty = 100;
        let bribe = {};
        this.fractions.forEach(fraction => fraction.members.forEach(deputy => {
            if (deputy.honesty < bribeHonesty) {
                bribeHonesty = deputy.honesty;
                bribe = deputy;
            }
        }))
        console.log(bribe);
    }
}

const rada = new Rada([]);


//     - додати\видалити фракцію
rada.createFrac('Honesty', dep1, [dep1, dep2]);
rada.createFrac('Do the best', dep3, [dep3]);
rada.removeFraction('Honesty');
// - вивести всі фракції
rada.showAllFractions();
// - вивести конкретну фракцію
rada.showSpecificFraction('Do the best');
// - додати\видалити депутата з фракції
frac.addDeputy(dep4)
// frac.
// - вивести всіх хабарників фракції
frac.showAllBribes()
// - вивести найбільшого хабарника у фрації
frac.showTheBiggestBribeMan()
// - вивести найбільшого хабарника верховної ради
rada.showTheBiggestBribeMan()
// - вивести фсіх депутатів фракції
frac.showAllDeputies()
// - спробувати дати взятку. Чим чесніший депутат тим склідніше дати йому хабаря.
dep1.giveBribe(555);