import { ICostumer } from "@/types/costumer";
import { getApiUrl } from "@/utils/get-api-url";

export function getCostumer(id: string): Promise<ICostumer> {
  return fetch(getApiUrl(`costumers/${id}`)).then((data) => data.json());
}

export const getCostumerAsClient = async (id: string) => {
  const data = await fetch(getApiUrl(`costumers/${id}`)).then(
    (data) => data.json()
  );
  return data;
};
