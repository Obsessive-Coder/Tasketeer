module.exports = function follow(api, rootPath, relArray) {
    const root = api({
        method: 'GET',
        path: rootPath
    });

    return relArray.reduce((root, arrayItem) => {
        const rel = (typeof arrayItem === 'string') ? (
            arrayItem
        ) : (
                arrayItem.rel
            );
        return traverseNext(root, rel, arrayItem);
    }, root);

    function traverseNext(root, rel, arrayItem) {
        return root.then(function (result) {
            const { entity } = result;
            if (hasEmbeddedRel(entity, rel)) {
                return entity._embedded[rel];
            }

            if (!entity._links) {
                return [];
            }

            const apiObj = {
                method: 'GET',
                path: entity._links[rel].href
            };

            if (typeof arrayItem !== 'string') {
                apiObj.params = arrayItem.params
            }

            return api(apiObj);
        });
    }

    function hasEmbeddedRel(entity, rel) {
        return (entity._embedded && entity._embedded.hasOwnProperty(rel));
    }
};