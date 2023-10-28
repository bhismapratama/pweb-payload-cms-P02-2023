import payload from 'payload';

/** @type {import('payload/types').CollectionConfig} */

const Todo = {
    slug: 'todo',
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
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'publishedDate',
            type: 'date',
            label: 'Published Date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                    displayFormat: 'd MMM yyy h:mm:ss a',
                },
            },
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            options: [
                {
                    value: 'not started',
                    label: 'Not Started',
                },
                {
                    value: 'on progress',
                    label: 'On Progress',
                },
                {
                    value: 'done',
                    label: 'Done',
                },
            ],
            defaultValue: 'not started',
            admin: {
                position: 'sidebar',
            },
        },
    ],
    hooks: {
        afterOperation: [
            async (args) => {
                if (args.operation == 'create') {
                    payload.create({
                        collection: 'changelog',
                        data: {
                            type: 'Todo',
                            name: args.result.title,
                            action: 'Created',
                        },
                    });
                }
            },
        ],
        afterChange: [
            async (args) => {
                if (args.operation == 'update') {
                    payload.create({
                        collection: 'changelog',
                        data: {
                            type: 'Todo',
                            name: args.doc.title,
                            action: 'Updated',
                        },
                    });
                }
            },
        ],
        afterDelete: [
            async (args) => {
                payload.create({
                    collection: 'changelog',
                    data: {
                        type: 'Todo',
                        name: args.doc.title,
                        action: 'Deleted.',
                    },
                });
            },
        ],
    },
};

export default Todo;
