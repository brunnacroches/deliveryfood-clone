// First, we must import the schema creator
import { createSchema } from "part:@sanity/base/schema-create";

// Then import types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import category from "./category";
import dish from "./dish";
import featured from "./featured";
import restaurant from "./restaurant";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
    name: 'default',
    types: schemaTypes.concat([
        restaurant, 
        category, 
        dish, 
        featured]),
});