import { Oso } from 'oso';
import { User } from './user';
import { Expense } from './expense';

let oso: Oso;

const initOso = async () => {
  const oso = new Oso();
  oso.registerClass(User);
  oso.registerClass(Expense);
  await oso.loadFile('src/authorization.polar');
  return oso;
}

const getOso = async () => {
  if (!oso) oso = await initOso();
  return oso;
};

export const authorize = async (actor: any, action: any, resource: any) => {
  const oso = await getOso();
  if (await oso.isAllowed(actor, action, resource)) return resource;
  throw "Not Authorized";
}
