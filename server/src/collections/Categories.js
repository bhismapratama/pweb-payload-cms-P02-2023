import payload from 'payload';

const createChangelogEntry = async (type, name, action) => {
    await payload.create({
        collection: 'changelog',
        data: { type, name, action },
    });
};

const Categories = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        create: () => true,
        read: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
    ],
    hooks: {
        afterOperation: [
            async (args) => {
                if (args.operation == 'create') {
                    await createChangelogEntry('Category', args.result.name, 'Created');
                }
            },
        ],
        afterChange: [
            async (args) => {
                if (args.operation == 'update') {
                    await createChangelogEntry('Category', args.doc.name, 'Updated');
                }
            },
        ],
        afterDelete: [
            async (args) => {
                await createChangelogEntry('Category', args.doc.name, 'Deleted');
            },
        ],
    },
};

export default Categories;
