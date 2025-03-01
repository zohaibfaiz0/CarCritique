

import { type SchemaTypeDefinition } from 'sanity';
import post from './post';
import comment from './comment';
import blockContent from './blockContent';
import compare from './compare';
import { newsAndUpdates } from './news';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, comment, blockContent, compare, newsAndUpdates],
};
