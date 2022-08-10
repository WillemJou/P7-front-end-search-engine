import { recipes } from "/recipes.js";


// manipulate arrays to modify the display of the list of ingredients
export const manipulateIngdtsArray = () => {
    recipes.forEach((recipe) => {
        const ingdts = recipe.ingredients.map((obj) => {
                    return Object.values(obj);
                    });

        const ingredientlist0 = () => {
                    if (ingdts[0]) {
                        const ingdt0 = ingdts[0];
                        const get2First0 = ingdt0.slice(0, 2);
                        const join2First0 = get2First0.join(": ");
                        const get2Last0 = ingdt0.slice(2, 3);
                        const join2Last0 = get2Last0.join(" ");
                        const splitjoinFirst0 = join2First0.split();
                        const splitJoinLast0 = join2Last0.split();
                        const concat2Splits0 = splitjoinFirst0.concat(splitJoinLast0);
                        const inglist0 = concat2Splits0.join(" ");
                        return inglist0;
                    };
                };
               
        const ingredientlist1 = () => {
        if (ingdts[1]) {
            const ingdt1 = ingdts[1];
            const get2First1 = ingdt1.slice(0, 2);
            const join2First1 = get2First1.join(": ");
            const get2Last1 = ingdt1.slice(2, 3);
            const join2Last1 = get2Last1.join(" ");
            const splitjoinFirst1 = join2First1.split();
            const splitJoinLast1 = join2Last1.split();
            const concat2Splits1 = splitjoinFirst1.concat(splitJoinLast1);
            const inglist1 = concat2Splits1.join(" ");
            return inglist1;
        };
    };

        const ingredientlist2 = () => {
        if (ingdts[2]) {
            const ingdt2 = ingdts[2];
            const get2First2 = ingdt2.slice(0, 2);
            const join2First2 = get2First2.join(": ");
            const get2Last2 = ingdt2.slice(2, 3);
            const join2Last2 = get2Last2.join(" ");
            const splitjoinFirst2 = join2First2.split();
            const splitJoinLast2 = join2Last2.split();
            const concat2Splits2 = splitjoinFirst2.concat(splitJoinLast2);
            const inglist2 = concat2Splits2.join(" ");
            return inglist2;
        };
    };

        const ingredientlist3 = () => {
        if (ingdts[3]) {
            const ingdt3 = ingdts[3];
            const get2First3 = ingdt3.slice(0, 2);
            const join2First3 = get2First3.join(": ");
            const get2Last3 = ingdt3.slice(2, 3);
            const join2Last3 = get2Last3.join(" ");
            const splitjoinFirst3 = join2First3.split();
            const splitJoinLast3 = join2Last3.split();
            const concat2Splits3 = splitjoinFirst3.concat(splitJoinLast3);
            const inglist3 = concat2Splits3.join(" ");
            return inglist3;
        };
    };
    
        const ingredientlist4 = () => {
        if (ingdts[4]) {
            const ingdt4 = ingdts[4];
            const get2First4 = ingdt4.slice(0, 2);
            const join2First4 = get2First4.join(": ");
            const get2Last4 = ingdt4.slice(2, 3);
            const join2Last4 = get2Last4.join(" ");
            const splitjoinFirst4 = join2First4.split();
            const splitJoinLast4 = join2Last4.split();
            const concat2Splits4 = splitjoinFirst4.concat(splitJoinLast4);
            const inglist4 = concat2Splits4.join(" ");
            return inglist4;
        };
    };

        const ingredientlist5 = () => {
        if (ingdts[5]) {
            const ingdt5 = ingdts[5];
            const get2First5 = ingdt5.slice(0, 2);
            console.log(get2First5);
            const join2First5 = get2First5.join(": ");
            const get2Last5 = ingdt5.slice(2, 3);
            const join2Last5 = get2Last5.join(" ");
            const splitjoinFirst5 = join2First5.split();
            const splitJoinLast5 = join2Last5.split();
            const concat2Splits5 = splitjoinFirst5.concat(splitJoinLast5);
            const inglist5 = concat2Splits5.join(" ");
            return inglist5;
        };
    };
    return {ingredientlist0, ingredientlist1, ingredientlist2, ingredientlist3, ingredientlist4, ingredientlist5}
    });   
};





