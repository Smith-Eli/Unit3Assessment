const fs = require('fs');

function totalIntegers(jsonFile) {
    try {
        const data = fs.readFileSync(jsonFile, 'utf8');
        const jsonData = JSON.parse(data);

        let dataObj = {};
        let dataArray = [];
        let highestTotal = 0;
        let animalWithHighestTotal = '';

        jsonData.records.forEach(record => {
            if (!dataObj.hasOwnProperty(record[1])) {
                dataObj[record[1]] = {
                    name: record[1],
                    integers: [],
                    total: 0
                };
            }
            for (let i = 4; i < record.length; i++) {
                const value = parseInt(record[i]);
                if (!isNaN(value)) {
                    dataObj[record[1]].integers.push(value);
                    dataObj[record[1]].total += value;
                }
            }

            if (dataObj[record[1]].total > highestTotal) {
                highestTotal = dataObj[record[1]].total;
                animalWithHighestTotal = record[1];
            }
        });

        for (const key in dataObj) {
            dataArray.push({ name: dataObj[key].name, total: dataObj[key].total });
        }

        console.log(`Animal with the highest total is ${animalWithHighestTotal} with a total of ${highestTotal}`);

        console.log(dataArray);

    } catch (error) {
        console.error(`Error reading file: ${error}`);
    }
}

const jsonFile = 'data.json';
totalIntegers(jsonFile);