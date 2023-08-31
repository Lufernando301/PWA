const NOME_BANCO = "consumo _agua";

const REGISTRO_CONSUMO_AGUA = "consumo _agua";

const init = (onSucesso, onError) => {
  const dbRequest = window.indexedDB.open(NOME_BANCO, 1);

  dbRequest.onsuccess = function (event) {
    onSucesso(event.target.result);
    console.log("Banco de dados inicializado.");
  };

  dbRequest.onerror = function (event) {
    onError(event.target);
  };

  dbRequest.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore(REGISTRO_CONSUMO_AGUA, {
      keyPath: "id",
      autoIncrement: true,
    });

    console.log("Banco de dados criado!");
  };
  
};


let dbPromisse;

const getBD = () => {
  if (!dbPromisse) {
    dbPromisse = new Promise((resolve, reject) => {
      init((bd) => {
        resolve(bd);
      });
    });
  }
  return dbPromisse;
}

const getObjectStore = async (objectStore, mode="readwrite") => {
  const db = await getBD(); 
  return db.transaction(objectStore, mode)
            .objectStore(objectStore);
}
export {getBD, getObjectStore, REGISTRO_CONSUMO_AGUA};