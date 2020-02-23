/**
 * @description show a complete log of the differences between two js objects
 * @param object1
 * @param object2
 */
export function showDiff(object1, object2) {
    console.log(buildDiff(object1, object2));
}

const buildDiff = (object1, object2) => {
    let diff = 'Difference:\n';

    Object.keys(object1).forEach(key => {
        if (object1[key] !== object2[key]) {
            diff += bothAreObjects(object1[key], object2[key]) ?
                buildDiffChildObjects(key, object1, object2) : diffString(key, object1, object2);
        }
    });

    Object.keys(object2).forEach(key => {
        if (!object1[key]) {
            diff += diffString(key, object1, object2);
        }
    });

    return diff;
};

const bothAreObjects = (val1, val2) => {
    return (typeof val1 === 'object' && val1 && typeof val2 === 'object' && val2);
};

const buildDiffChildObjects = (key, object1, object2) => {
    const diff = buildDiff(object1[key], object2[key]);
    return diff === 'Difference:\n' ? '' : `${key}:\n  ${indent(diff)}`;
};

const diffString = (key, object1, object2) => {
    return `${key}:\n  object1 : ${object1[key]}\n  object2 : ${object2[key]}\n\n`;
};

const indent = (string: string) => {
    return string.replace(/\n/g, '\n  ').replace(/(  )$/, '');
};
