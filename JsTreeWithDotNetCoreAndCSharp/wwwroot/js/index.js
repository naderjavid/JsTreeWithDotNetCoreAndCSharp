$(function () {
    var tree = $('#jsTree')
        .jstree({
            core: {
                animation: 0,
                check_callback: true,
                themes: { stripes: true },
                data: {
                    url: '/api/tree',
                    dataType: 'json',
                    data: function (node) {
                        if (node.id !== '#') return { 'id': node.id }
                    }
                },
                'check_callback': function (o, n, p, i, m) {
                    if (m && m.dnd && m.pos !== 'i') { return false; }
                    if (o === "move_node" || o === "copy_node") {
                        if (this.get_node(n).parent === this.get_node(p).id) { return false; }
                    }
                    return true;
                },
            },
            types: {
                '#': {
                    max_children: 1,
                    max_depth: 4,
                    valid_children: ['root'],
                },
                root: {
                    valid_children: ['default'],
                },
                default: {
                    valid_children: ['default', 'folder'],
                },
                file: {
                    icon: 'fa fa-file',
                    valid_children: [],
                },
            },
            plugins: ['contextmenu', 'dnd', 'search', 'state', 'wholerow'],
        })
        .on('delete_node.jstree', function (e, data) {
            console.log('delete_node.jstree', e, data);
            var { node } = data;
            fetch({
                url: `api/tree/${node.id}`,
                method: 'delete'
            })
                .then((r) => { })
                .catch((err) => {
                    data.instance.refresh();
                });
        })
        .on('create_node.jstree', function (e, data) {
            console.log('create_node.jstree', e, data);
            var { node } = data;
            var parentId = node.parent;
            fetch({
                url: `api/tree/create`,
                method: 'post',
                body: `{"name": "${node.text}", "parentId": "${parentId}"}`
            })
                .then((r) => { })
                .catch((err) => {
                    data.instance.refresh();
                });
        })
        .on('rename_node.jstree', function (e, data) {
            console.log('rename_node.jstree', e, data);
            var { old, text, node } = data;
            var parentId = node.parent;
            fetch({
                url: `api/tree/rename`,
                method: 'post',
                body: `{"id": "${node.id}", "newName": "${text}"}`
            })
                .then((r) => { })
                .catch((err) => {
                    data.instance.refresh();
                });
        })
        .on('move_node.jstree', function (e, data) {
            console.log('move_node.jstree', e, data);
            var { old, node } = data;
            var parentId = node.parent;
            fetch({
                url: `api/tree/move`,
                method: 'post',
                body: `{"id": "${node.id}", "newParentId": "${parentId}"}`
            })
                .then((r) => { })
                .catch((err) => {
                    data.instance.refresh();
                });
        })
        .on('copy_node.jstree', function (e, data) {
            console.log('copy_node.jstree', e, data);
            var { old, original, node } = data;
            var parentId = node.parent;
            fetch({
                url: `api/tree/copy`,
                method: 'post',
                body: `{"id": "${original.id}", "parentId": "${parentId}"}`
            })
                .then((r) => { })
                .catch((err) => {
                    data.instance.refresh();
                });
        })
        .on('changed.jstree', function (e, data) {
            console.log('changed.jstree', e, data);
        });
});