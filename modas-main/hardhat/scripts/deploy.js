async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Desplegando contrato con la cuenta:", deployer.address);

  const MoDASToken = await ethers.getContractFactory("MoDASToken");
  const token = await MoDASToken.deploy(deployer.address);
  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();
  console.log("Token MoDAS desplegado en:", tokenAddress);
  
  // Guardar la dirección para la verificación
  const fs = require('fs');
  fs.writeFileSync(
    'contract-address.txt',
    `Token Address: ${tokenAddress}\nDeployer Address: ${deployer.address}`
  );
  
  console.log("Espera 30 segundos antes de verificar...");
  await new Promise(resolve => setTimeout(resolve, 30000)); // espera 30 segundos

  // Intenta verificar el contrato
  try {
    await hre.run("verify:verify", {
      address: tokenAddress,
      constructorArguments: [deployer.address],
    });
    console.log("Contrato verificado exitosamente");
  } catch (error) {
    console.log("Error en la verificación automática. Usa 'npm run verify' manualmente después");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 