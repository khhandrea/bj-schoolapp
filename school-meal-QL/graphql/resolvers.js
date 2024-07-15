import { getMenu } from "./db";

const resolvers = {
    Query: {
        menu: (_, { month, date }) => getMenu(month, date)
    },
};

export default resolvers;