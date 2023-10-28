/** @type {import('payload/types').CollectionConfig} */

const Changelog = {
    slug: 'changelog',
    access: {
        create: () => false,
        read: () => true,
        update: () => false,
        delete: () => true,
    },
    fields: [
        {
            name: 'halo',
            label: 'hai',
            type: 'text',
            required: true,
        },
        {
            name: 'nama',
            label: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'action',
            type: 'info',
            required: true,
        },
    ],
};

export default Changelog;
