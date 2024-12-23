const fetch = require('node-fetch');
const fs = require('fs');

async function main() {
  const contractAddress = "0x92951AB7015F4907542B1578394E978d3BAd0C14";
  const [deployer] = await ethers.getSigners();
  
  console.log("Verificando contrato en la dirección:", contractAddress);
  
  try {
    // Leer el código fuente aplanado
    const sourceCode = fs.readFileSync('./contracts/MoDASToken.flattened.sol', 'utf8');
    
    // Preparar los datos para la verificación
    const verificationData = {
      module: "contract",
      action: "verify",
      addressHash: contractAddress,
      name: "MoDASToken",
      contractSourceCode: sourceCode,
      compilerVersion: "v0.8.20+commit.a1b79de6",
      optimization: true,
      optimizationRuns: 200,
      constructorArguments: deployer.address,
      evmVersion: "paris",
      licenseType: 3 // MIT License
    };

    console.log("Enviando solicitud de verificación...");
    
    const response = await fetch("https://sepolia.explorer.mode.network/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(verificationData)
    });

    if (!response.ok) {
      const text = await response.text();
      console.log("Respuesta completa:", text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Resultado de la verificación:", result);
    
    if (result.status === "1") {
      console.log("Verificación exitosa!");
    } else {
      console.log("La verificación falló:", result.message);
    }
    
  } catch (error) {
    console.error("Error al verificar:", error);
    if (error.response) {
      console.error("Detalles de la respuesta:", await error.response.text());
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 