import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import BlockCard from './components/Block';
import './App.css';
import TransactionDetails from './components/TxDetails';
import { Pagination } from '@mui/material';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Input from './components/Input';
import Typography from '@mui/material/Typography';


// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();
  const [transactions, setTransactions] = useState([]);
  const [blockTimer, setBlockTimer] = useState(12);
  const [currentGasPrice, setCurrentGasPrice] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [addressBalance, setAddressBalance] = useState(null);



  // calculate start and end indices
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const paginatedItems = transactions
    ? transactions.slice(startIndex, endIndex)
    : transactions;

  useEffect(() => {
    let isMounted = true;
    async function getBlock() {
      const block = await alchemy.core.getBlock();
      setBlock(block);
    }

    getBlock();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function getGasPrice() {
      const gasPrice = await alchemy.core.getGasPrice();
      setCurrentGasPrice(gasPrice);
    }

    const interval = setInterval(() => {
      getGasPrice();
    }, 1000); // Update gas price every 1 second

    return () => {
      isMounted = false; // Mark component as unmounted in cleanup function
      clearInterval(interval);
    };
  }, []);
  const handleGetTransactions = async () => {
    const params = {
      // blockNumber
      // blockNumber: 17325010,
      blockHash: block.hash,
    };
    const tx = await alchemy.core.getTransactionReceipts(params);
    setTransactions(tx.receipts);
  };


  const getAddressBalance = async () => {
    const balance = await alchemy.core.getBalance(search);
    console.log(parseInt(balance._hex));
    setAddressBalance(parseInt(balance._hex));
  }
  
  const handleAddressFunction = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value);
  };

  const getLatestBlock = async () => {
    const block = await alchemy.core.getBlock();
    setBlock(block);
    // @todo add block timer to disable the button for 12 seconds
    // const timer = setInterval(() => {
    //   setBlockTimer((blockTimer) => blockTimer - 1);
    // }, 1000);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid xs={6}>
        <Alert severity="info">
          Current Gas Price: {parseInt(currentGasPrice._hex)}
        </Alert>
        {block && (
          <BlockCard
            block={block}
            getTransactions={handleGetTransactions}
            getLatestBlock={getLatestBlock}
          />
        )}
        <h3>
          {transactions.length === 0
            ? ''
            : `${transactions.length} transactions in Block ${parseInt(
                transactions[0].blockNumber
              )}`}
        </h3>
        {paginatedItems.map((tx, idx) => (
          <TransactionDetails key={idx} txData={tx} />
        ))}

        <Pagination
          count={Math.ceil(transactions.length / itemsPerPage)}
          page={page}
          onChange={(event, page) => setPage(page)}
        />
  </Grid>
  <Grid>
   <Input label = {"Get Address Balance"} onChange = {handleAddressFunction} getAddressBalance={ getAddressBalance}/>
   {addressBalance === null ? "" : <><p style={{fontWeight: "bold"}}>Balance of {search}</p> <Typography>{addressBalance} WEI</Typography></>}
  </Grid>
       </Grid>
      </Box>
    </>
  );
}

export default App;

/*

{
    "hash": "0x04c35f4790c89cc649f62ca77a0d79fdfb061bac4e462f4ba2b97d529bf61fb0",
    "parentHash": "0x791e5999cbbafbb15cffbbdc869532eec2336354a01239af6fc3b1e777140838",
    "number": 17325010,
    "timestamp": 1684882271,
    "nonce": "0x0000000000000000",
    "difficulty": 0,
    "gasLimit": {
        "type": "BigNumber",
        "hex": "0x01c9c380"
    },
    "gasUsed": {
        "type": "BigNumber",
        "hex": "0x01ac9c74"
    },
    "miner": "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
    "extraData": "0x7273796e632d6275696c6465722e78797a",
    "transactions": [
        "0xd3d02a0d8b38de79463a6433fde513252530932f07786d8aa33be35f0d93d5b2",
        "0xfdd21868dd56744820e534be1ae2b2c5fe4b3b9ab7ad6008a8b624aefc640718",
        "0xafaf9ed634798513b226fea2a63cc994afdf88b8c3602e464b5c03af49020654",
        "0x067868df50fdcbfac0b2861d285121b7e5d978e84c2bede9c5be90125ba5d3b7",
        "0x6885e3971aba04eaa5987a89f4eebd9128a188922cb7e20db6e2e1f3f10e6479",
        "0xe83d4699eae1a7a73d61a186cf13d105166de6bfb4202fe93ffb7dd2749640dd",
        "0x36d8afceafb1af8de4e0dab47e31895467199bed3dd1af83e4e0f20bc2e2c24a",
        "0xc3b9a667c8e1b95b66d0f73e7714862bc78b4572d8ec31aecac62f718b60018d",
        "0x869c102d09d50abc650d1c08d61f568b98777d3490bebd12e6cde0f9926620aa",
        "0x200ff4d7f45978458f8a23c9a11454327e84f0ccbd9185d187372f01ac25e6d8",
        "0xb7b81e18994ab017d7269b483f3b8b875bdb5a36cd9ebde96b9ba26a32ca607a",
        "0x80703b6d63821d369e81cbffb22173f54d2f448888d8c156f197bcd1a7f58264",
        "0x2b5ed54247855ba9b1513de239553749082014db7f38077b6d67dd13c3e63ecd",
        "0x7dd9e2a8b4868a5d20403d38e26edc1f2e7c6eb4bd1b71efe423ccb12f6636dc",
        "0xa9a65c310119b81499562e9aac92768e79ac22fff2f08ae93e4a5408233b0c1a",
        "0xe9370270f61da5bc6bce28b01b895b8812f8bc9c3cccd19b144fa50d5a955524",
        "0xd105d863777f0b5c41644308d2f811531629c28522602ebdbdbbb9159c3ee139",
        "0x8ac605f5ecf933799cfce11b4664318522d5fd13c9677189b791dcd7882e6c12",
        "0x99f5e1428abb00b4f7ee424ba7bdc28f8d63037145159511804427f70cde4a16",
        "0x925396303ca716889810729b0ab66e765d7601a0c05339844629f2b8dc856be2",
        "0xb61d1bb738e95c5b5a10624b96ce5af42adb70cc894637f636426b3c4aab3c29",
        "0x90dd50cd4ae5b33cb746576c819b18dc8030896a9b3e83dc7c5a293424e32662",
        "0xca47c58bd634345ea3b47b07a9a119988e1421005068fe7d19f71159fc600a8a",
        "0x63f9714d8cd01e176a76570d665726a65eb2dcfc793d1a01117b4935f972f3bb",
        "0x0fade920253848a0ac8451355ba566b3411983bc8fd2a46010bc2b42eecbf497",
        "0x13a03feade6d3a3111f0e099e0c407d00b1b0ed82f0f73152e1f744fea4bad1c",
        "0x7b403376fa3a975c5bec128efa6454cfd264ad4e454e58cc06b493e956b91e8d",
        "0xda77f89d4dadac4cdeccb7eba515968ff1380323f4a2c555c3ccb02cf30edd09",
        "0x0ea103a205abb05487b181a75c1ca999bfd3a94c3fb90595a5afc502a80d89b7",
        "0x0924b69d599c7be7d46f06ff7c5c3ace05e93a690252ae750acacebf0e7cd39a",
        "0xca4b204bef0d728d6cbcd273b6db14aeed066e28ccc84f046ca5a9fc5d152911",
        "0xd3c1219f532213e77da1b45ddf130f47087782b5ac3fb86d2075d12d416b82a7",
        "0xcd7118a1ffe427dbb1eb9c648708c620fcb01cec5ee6c6566e393e5857d7523b",
        "0x2e7125f6870d41251e82e7bcf5dd4a7204606c65534504c51f52d11d404a0dc3",
        "0x9576b9d2f02025835eba384b7dccbbce665d622746b6fc76490b9e211380b5a2",
        "0xa1619e8949a1a2b66875708ec1b59b4fb73745bbed95e544210e1eb7f8b7f015",
        "0x0771ab40fb1f279ef3f5535e117191216180b806a08df4db835492eae813a2c7",
        "0xfc555fbcf7abe8ca0d2de3487397b754ae55aa1e324b7c1a13c9a41db763d533",
        "0xd17ca5508e50b7083c25686742533d57ad7892838e7cd5663f14522c41302145",
        "0x995b948b64d3170030f19267a5e0e1b8d53a7bed61e4637048fbad5b22cc5508",
        "0x40bcc47be0903a0066de2b2154bfe4335aec8cc98d5a531cc8775bbe0e4ba937",
        "0x7d97d94a93f621ff7e2cad47988b3c59e94478c3b1415125a35948c7b4ba9f72",
        "0x511d91546b119c3f31ad2904d66a2f11494b313cd8e776de85fdfe3f095c74e8",
        "0x3963e3f2eb77e76be390d2608d2868187236cd30dc72994e60c9cb65ed945f57",
        "0x96074ad0ee66b92c508276e3cba6a955d941747db61e2d79d6962918cd6adb60",
        "0x8623ff646936406212b1483f0119361cbec85f20e2e75da60acc72b9bc6ff907",
        "0xb452680bde1207bb5df7044fbf0beed1bc125af10985cad4bb2f424af04beac6",
        "0xa8b0eea03ed91ef2639320330aa7f99d96dff83a289e3494e6c4573525b1f2b8",
        "0x57cdd1e1e4a62c82fb2ea5ccd2204f1e944a5061a085256881ace75405189cde",
        "0xf5e0f406a9904f320db3539e76bde23511a886f6210e1ff80e982bf95e2f6c9e",
        "0x4705ac95874745411f8fcfd9b49d91970140d5c680f76e318f13d9f5760ff680",
        "0xd4b27a9c3f99e8dc7f56fd9653a255327b7b747efdf3c56765487dfd3775f587",
        "0x2509eab5b5ad970ba1db8c7db48f7f2b166fe793c4553d30ffc554434e86f0cd",
        "0x7ecd52de0c2fa0b9ee3a47b52d8f9046c47cf7faedbee176cdf1ebd97982b4d6",
        "0xafb536862c72b8567b66dc9926e7c515b51e749254b33ba286ee21445ed41e0d",
        "0x28636077b60f72c63c5e06502ee74c8e73f5692099d04e33f7cbec872c9e658c",
        "0xe3cea228ffb4b20b34fcf6ac785a8e5ea040c67af78ebace4646cef0976dbe49",
        "0x9cd763b9cf61de3568943d68d612f5b5358f8ada68a6bdf306b57f3b97a588ac",
        "0xd5d8ae108aa66368fc659ebc3b43a6acf67aac5221cc64d821b53985228688cc",
        "0x713039ee224e05db1788de21808344bd67a03cc9f3fa729a85d27554e86f7b8e",
        "0x22a08812e5cd88c9fc285632544df782d47112e7cb54fed0be92191e3a6aacca",
        "0x02b91f2d5cb61745835212f5a5580e9e823b63a03a336a1d3c7a0d5fc13736fb",
        "0x31f5077b62bb545bee693f7389154d28528978a5a509d8f6ba510d51811e37f3",
        "0xbc58084bf30f341e55c6908ef2a2191051681dce7e32624f8e9db02b8cf859b7",
        "0xa9b1f78d40e2f4a14915bfe3623fa957ec7e4e3c03b92b3fb467e8ace405a35f",
        "0xa33a1408fba6ea50aee3d23f40aa570dff1fb43b7c1ab6382c81619abb01d9fe",
        "0x3d6b837ac17067c8aeb6f76b07536ea8b8db753f92b9b08fa39d9674ad66ee96",
        "0x2ae08ef4ac544614352c838372f8fcc22ebdcaeb0fa42b8d082f284a09173438",
        "0x16821529b34110d6f9c865e83ec69d0c28bda4d49b7ce90da6160e8f2a024ce3",
        "0x9054dbdea3381eacd93f8637f2a28ba41e2eb548ab98f837bc7836b41bfc6ce3",
        "0x63d808e68f6fdd10af1d205d56eeedf956630390de26ec3c7c4ee203f2c91aea",
        "0x1e3d3965925ea7bb4e01ab3fa47212cf879c589731676838b884863f5184cb39",
        "0x6e0bd00be5b371bd324a5a19f5e56f2fd7dbc8b4d8e624911e3469810cec0202",
        "0x3f83a83c5b7eedebb3e183f398df8bfe37c648262e822d48b4cfad2febab4cae",
        "0xf258d0a0ed41227f7f2f5f4dc874c4af73f80d3535f27c37e729c59172deed96",
        "0x78e1ea98c5b88f9ef515d134660f0335cba1bc9d8647c02c6386214780291af7",
        "0xe8b67a32683a87e99d0d30fe501ac7de6aaf19dca74f1d6b3d25c2355e1459d7",
        "0x64c9e3efa8d8d16dca1fb8a55d63867c74124830c5d4a276d770401efd93ced5",
        "0x29cca43eeb0d02226574fae4ca884c65287b81711e3877cd1d06517a06f4dd23",
        "0xdd01103efe62ad3001e179de9608167c2a705598189fb5fa1ebd17a2eea95a04",
        "0x7707b5e6a15b2183f106742091b0a3ae59daf42ce8e6940a2d9ab16c7efbe35c",
        "0xc89462f7e189af24a554e430fa0114fa754dd9161fa83f18d712dcfcaead6896",
        "0xb1e7ebd6ba7908ac984e200d016165b9f063769297b4d7bc69d81e7ca6f9863f",
        "0xfef5c0209b06fa96e592b54ac19a27b736c7151b2a634b74cd78ce3c8b048851",
        "0xc076c0386566c50af94b99d818a0cf2c70d9f4eee4bc0bb0f31f43205908880d",
        "0x8a1fe0008af4e927de81b40ba5306939c26e6b53242ac8268c84c120894a56b7",
        "0x4a4ae4582d82605f08140a5dfbe1825b06bcf26ce0cedbad4f430f68addd4452",
        "0xe7af3caf204793c73a1e977001088ec28071a4d7e02cef2b2edc65d8c2afef13",
        "0x9761de5fd1bde03dfdbef018c9005e215a2cc05b825fde2b329e00a88cd5c0d4",
        "0x6af44107a2287f9e3f9fc48b0fbe337e69aa6f1a8fdc23492d477a3b193f95e1",
        "0xe000f0486b62c799dfedb781c7c05d50f26a978f9bb4a6be8112d9a63a4e726f",
        "0xb404568214fda7bc66c1f9b4790512dd2d3fe0a1e06e54e815e989122692c7e8",
        "0xaa6c5a8ecf9bac85dd2b384c6c3eab43dada81dd6f359b00a6465781eb9cd079",
        "0x0389c4ab010d9c7baea92560f8826338127f7ccf8554a12a3a9abfde96d697ad",
        "0x7ceea20ad147457f019c70537010ee79159bc96fa071ff0151384b47eac47367",
        "0x76de9cb2603a46ced6db1fd0dcf878d8db3b9f8ac194b851a4db6c0488ffe3c5",
        "0x3bf4e36c1468bc49369931b94c39797edb5ebbdc81be2e89e6df0198638bd838",
        "0x4a5ac39c95bf2cb156211b586de8e8d48cb09183f2dea55d2208246a1ba50aa6",
        "0x976931b125dc2aac1ae3707ad68ff0c184be4134972dde95196cdfae78246211",
        "0x6fbe3916005890ddddf90c1615246dc55ea85137efa1ee0ac43ae6c407adcb48",
        "0x46a197e3272db3a9bd5dd538dd6ab97763e7373c60267b5c42fb9d49074ec580",
        "0x7e7dbac2dfde0924b34a4bf85151e3f1e4a3a0b2d5f2fbaad8ae957c2679ece6",
        "0xb876aafd42e2596de91299418dfd12baee9068e0a3a8804728e620314cfa0c0d",
        "0x974f3ec473c7342204ac56fa7f81cec418c92556ff8b42085f62266c294cb828",
        "0x9a147a7a3a6ddc4e02d689a0216a6f5763c57b1cfb0e29b63efd76a9c5ba8c2b",
        "0xbc7b6b390520fc17f4813d599c2d5cbdeed1bf6fac2b54bd5c263525f7408166",
        "0xdad53321f1472554e673003bcd1839df096a409ca40ed322cd884d70a69b2f23",
        "0x8aa3e00d2346296bb9f863fb09b94f4e33fc043ed1e2d1bf8385001a8e91e2e6",
        "0x2dc73d661ee112c45e692256528aeda0a188f94ad3760b182f62f1d596b3c7ec",
        "0x5bbfc885d8d1264b36390dbfafe7a46980b764d04de0a4d9fa551bcb6d1717d2",
        "0x15b97d8b73b5aa9db30581503ddda7e912504b9c4cd05ec46d2f11b302a72672",
        "0xcf7c5935eb2dc459988409810557b0f9301544f783349bccaa19aa212ac3420d",
        "0xc675600637faa06cdb1cf763a7d8f324a7cd240efe7eb6b87f33083ceac45449",
        "0x8b9a8440a36a693e20af8f76dc797021ab63705b61c564903e37acc8edac021f",
        "0xb6216462494f128f2ff97d63815e2f5986aff838814ff88f6233cf095dfc73d1",
        "0x419335a8d0d75068e964861117de19aeac508c0506279eee746d10d5faf1c05b",
        "0x04901c2741112c7de5f04666434ede1c1cd8bec9d971f809cc8e39783165b923",
        "0x4146867c08c008758766f937f714a0e61ce9f3a7b08feb898ee062218a1bb654",
        "0xcd3f87c9884b5c82224e16e1a8bde7f3a428c0ee3f6c68633c096804a2c82bc3",
        "0x5988909e5bb230a3c3717eaa4dd6569c0c5d82dcf42dd695278b803a79cb6b02",
        "0xf8816cc6f2da830cf2e267b1da700a4b96ef794a995b876152ba084c177444eb",
        "0xf607b2c7dec339950120df10982fd9613fd246caeb701e8b41e02abd84af3c57",
        "0x0d3305b0d8c9b12bfcd84145a8fcd11c370670e6ac9955fbcb46b8c772c654c0",
        "0x1f999b509a6e298b23805248f389fb80726472dbc46fe662ee715341fa5ffa36",
        "0x4fb565e378ab25e0ffad7782fbdddca1f278900e2531541b14fac6aa3723ef2e",
        "0x7c3f06ab0d30ebf2a75bb808a3d751d85ee90d89043e5cf8ce04e40b57a716ed",
        "0xf59843af02c8f3c68fe42786437b275411d88c449248cb7c71247ef28f97c1db",
        "0xdfb6482aa291d9366b5793f7a4b8e0a2a97612778a5b254fc8963075c1b9ff77",
        "0xcf9609595ae7ea8a2712dffa76d34077479f41a8b68ae129afbfe6d4e4d2dcc5",
        "0xad24021581f1f71e2778f52c57f64853c7b619aaacdfb2e602cc6f9db0250de4",
        "0x08f09b290d3904d710cec7abeb1e846862a7c6e691f0fb27daeab2f149d0fcb1",
        "0xe6e06dbc09167b03170fdde0a44bfc0bae48c7fbaea71ed3262ad04b972b2bd5",
        "0x613cbd018a0d3ac29e7d84d28ed82de67fd419cf02d7ad2537168159bfe112e6",
        "0xed3a249fe896bf371dca1cb2e58f0eff344c0d73951ff3cedf0a123e306746ec",
        "0x637960dd538220f2c07174240de69dd75740e4d1cb00daabdab75dfcc67f704f",
        "0x991c5d1628d410e481115b5f2cf483eaf427d19e9a5dd0229b3d673b3d5fc80b",
        "0xd3fcf6213ca7fddec9c716f31feb7f01b1aeca622d46ad40236aec6c8d8cdcb1",
        "0x842b3f065741470263c85d94e2fb3c28551b94843d2a23057c7bee41a0c31bd4",
        "0xd54d2675cd7a40738c1d28147d8307056aa9ecdee98c729bee00a08216c8778d",
        "0x68ac08c2556588c3e46d612749f43e6391c51a750486f91b40805bd5557d8d4b",
        "0xc117e4e5d8ac8e280aa93fd44b028562dd1c6978c51e3a46d132df12fa5c753f",
        "0x64aab11fa502ee66d6f0173ab343c69e68af7fe6d19088351f31bb056a2c959c",
        "0xffdb8676a69a0221594ec0a58c3ffa8f24611da0393eeac8679addf5144df733",
        "0xa1cc350e1de820203ae5386bd649461178361953a1608d5ba4a8e79541ec2562",
        "0xfbe052ed0456439d288baab1a1eb280b26a3012d96e9dc8dd16decea5e3463cf",
        "0x713e0f140c7b6ebc89d17762e93832ced9a895ffef4d494981fb39d4c3626e08",
        "0xf831adc403d42fbfeaaacc1f1c7ae845a3ff1afeece23a25a66315a4cd24f6ae",
        "0xda3ada4960a8a0ae1cd42e21aaaa9895bb93ded6c3464d6718ced614cf150dd3",
        "0x4508947ca007ea2c2f18552bbd117ae748f1c6ad028b4710c7df0e0224179446",
        "0xa29abfdc4cf6fbc3c600c8c386096dd5855c52a1c0f42ec2e88c0ea36af4fb6b",
        "0x215c73645b422802657eafafea3dc3d567a2f2a3e776d8e755e0b903a555f138",
        "0x68f78ae4274b1173b683afbfd7d868c1a026eb8802c683ad1fec5997f9cc507e",
        "0xe6df66fd3c799c12a805518f75b71037cdaf32e53de8f8cbe108fc4e95bd8c19",
        "0x03ea97c6bf8733d7309d27859ef2b55bb9193b215b9a1aa6bc658f53cd7e100b",
        "0x8b9185497502f933fd62ad9f5b68021d26c26158db2a4fde7c6699737d38b2d8",
        "0xa2369b7da97184edb9782fac76f55828b037a907e0f867a7d668419e1e7571a0",
        "0x42a736b1d317f30cd44f30d2a97d8615a485c0ac03e721bba54d6d763584df66",
        "0x6d787e9b25e10456a91add5cc372a761e0e65a337e3bcd3d08122782d3a6e0dc",
        "0x2cbde5e8e4544136de12838ed08e225159b814788390329757431a2f0decc481",
        "0x5f90d3ddcef3fc8c9f080030786571134752246c530dd184d52caa492d3e5e07",
        "0xfe34db049c2c9a90ff4021d3ca0fb5e666da98518282f0dd5ca1c424bc3d4436",
        "0x31ac1425a03c59fa283f83dcc82c69219d4f76073149dce492b54dd4211faf87",
        "0x5b69c72ad9119d8b3f47bdff316a974ba8e3ea5a18b213e26ecfd50cf7a70581",
        "0xae5e1745ce74664d886e774234c918456cdafc1f8f4fb0e3e0768a32b1dbc856",
        "0x727a488e7ba29e3550938162f3d1d3930f68bae1d4f13f901551317fa8508471",
        "0x75ae1f5c44ac3742a428c5c65ab813a853e8e8e574d4cbde8e485bbc6e5bf9c5",
        "0xc9d20886d171ac6db3276d2b2a57f3bf30fea42360bf3508b5081206f9761d44",
        "0x9c83e89f611a5d2d8fcc2d4df42da2a263e551060b7fb11556b34584f8ee237d",
        "0x0fd178d69cc514b2713d61477ad02a7710363e0971fcd2d2119d02ddb528844f",
        "0x3109a6fab091339538317f55fbfd346a2814c58d0ee0fe0bd873ad2df3d91d29",
        "0x602f954134f1a410413562cbfcbe825ae6926b666dd85ea5fe70adbeabee77fc",
        "0xf87f86fac6b6683765dcc4508c746c0cc9f52e9839f60bff17a61180013e7e99",
        "0xe6890725e88b8e04e1acb17fa22a39912a129c8bad8b51ab08d8d52d86818c4a",
        "0x44c595a851709bafd6eeea9d42cca82a403205d7c8d3fb57327575f9b2e235a7",
        "0xd002539739d90aae068878577df6e9add67c3c2744a973b4375b37dc36342bd4",
        "0x273a8aa24465dc14b13bc8418c1e4e825d07b95c529c2ed9081dd80098d6c822",
        "0xf28f6f0546c8724a52f40fef875412d6a04d0e3125f1391a281cc483f9543456",
        "0x35ff26a4f7a3bb4786d7bdfeb2963d3634fc2210c90bd029c21532b160c0c153",
        "0x5e760c6a923cb8143665e61fc09b49dc261cf4df36d546283068f157e868e9db",
        "0x51cb4559239a1fc6e1a4914d76876de865e782d4c95fd69d147a85197c7af542",
        "0x4a1562cf5c1053ede815c4ec50b55d1002416316cfe5c09e7740115e5bb4fd33",
        "0xba692903fe9807b9f825efb5eb989647788d3cee702652797150b1a39de9407f",
        "0x9f1deff6e6dcbc349691fe6faa6543724ffe1b2cc9d23f3c0151f1e9df819d30",
        "0x83bf73436b123fdca61f82dc8e193a0b8ac720292cb0aab7e8ea4bc032c300d1",
        "0x1c7d6805a19087776cfbc61fdb576afa42d0c62bdf9dcb9d02e4aeea779d4cd4",
        "0xc89f38f7fbb31c5f12f3d9e7b088c43b25197f16d4fd786bb75105626889010c",
        "0x3e1ae80d01daaa4e890a964ab7776b7e3402649549ebd927d46f1e4a22399442",
        "0xfb99a4fe6cfef30b743b10c4a58c750bfe438600aa6279c1eb2e1d7a8b0e5f0e",
        "0xd9d720b744971d627e295baaf3bad9f6e8818b9eeec728d46be14838c6bf1702",
        "0x62869b065b0d35263c26d4ab8efa7e7a5d251f3bcafad0c815922b3f069b9a0a",
        "0xe7784ad6941b9ea55248254ce3c3a5a043b234fd5442fe3c91cdce256ded34d2",
        "0x4262d98b4440c6844ecdbc32e7bd98ea3f774427984cca4fab11ffaba1ee6251",
        "0x3edf405059b3936870c78f6f58548231f1b5d661f405418e859bdd54c6673ceb",
        "0x04ae8a69a5c6d0aa404508070c43033510eb432d96da721afb4047ac1cd27f25",
        "0x06f9f54c2c8a0a35b8602fce7f0fea66fcd1cd5da1e867e23ed7ebb09d5cc4b4",
        "0x621b3e8ce190697447c600e3e508a43a15708234333dc0e0bb4bb465b75b081a",
        "0x7994cf32ef72bec6bd8f874ab403a7a006da345d062eb99a1cf4767828e6347d",
        "0xc0aa1a2eb79d77be950b2e3f4a5474472c5cd27b77ce5a2918054df239e4865b",
        "0xd7fbdaea4284499176d2d5c5ecf912fb5dea72f7e78f513cee8f456676982a23",
        "0xfe10c2e2f820a12b1cc7b4da385a564708bb4e4769dce3c60236771672b646cf",
        "0xf34ad2355a40fda722011db1b3315ad6f88eee72b6186e021f280d1a1935458d",
        "0xade435b4042fdb2681277c287d8b396ce0caed652b83b3e960f671876603f458",
        "0x688ae4e4db9a9cf662cecca1f7782d60a04ff344b73940a6860c046418aaa12d",
        "0x4c002bb8abb668bba09abcda7541ec5e4692e91806d048bbbffa803365a12200",
        "0x993702f35511172d5bc7f96a9889ca8a141c4ec28c8eb72047459b47ea19af5c",
        "0xbe7971489ee816274e52c044c8bec1d22ac08753db3422c5ee280f9380464add",
        "0xcfb618ecef4851b8531507c2d583e9a52333c55777ba72a385a10114b0476f20",
        "0x1560acba60ff7d1de1ff92dfb14a330df21d463035648cba89cf314805a4bf7e",
        "0xd0062c8fc8359198534d6479fe0bdedf4e8a076bf5d86ee5b2a84fcb1ecfd2cf",
        "0x717fdbe51952e17650481b66b3a3728ea615a345fec413c8da163403d0005c1b",
        "0x5c506e9eee27114a1d440063a57508e3b8a1b7786958f865387e03920b40c1a4",
        "0x22c8970a68ac1dac898d039669f941c25614fc7de9bb0e6b269037fc46a8dc52",
        "0x426592f81f190decd51ebb03c0eec19ed030608a803e05a44dc946a1a8e4a747",
        "0x5d2449b570221b6519f721e012d09781a4c222af74aac493e389e8256bb0a1d0",
        "0x503889fc466f1a74df3d5abd58766e0686dc044d9d617849b91cbed2668b4259",
        "0x2d7bc255c09edd2b771e6488bd902a2fee27837cf9c1543e174441215dbdd2b9",
        "0x4016c6b1e481e5a394bacb1245cb0c2305e82b25905cdb6546d6220dd41727bd",
        "0x54a6f6348c85118cf3b9f1d188b614cb9a1faae931c6e341b7d1bc1127ec5aa7",
        "0xe6c56745da4e7bf13bfc04240b470f2198ed3c26e4bdde1bb237a9db3e3cfb19",
        "0x288c4207405a6e7be51c331828dcd8bfc0281f9eca419c75cfc71eb25108bd85",
        "0xcaa6bdae5905b3db9f2d2549a5c9bef315662c64ed2414ed1a9577355e25e4bd",
        "0x94995514d625eccc9f5d75cb1104da43902e9651f1b5bfb637901cc4b704def9",
        "0xfb0c553aabf42e6b68773efb9667cdd0bb7975d1f5fced41d3de3f76424889dc",
        "0xe123d7d5aa7fef05ce5401c802055ce5ab08956864649db1c02536699a9bc5e1",
        "0x988d7b44e517cae74f8252400bf0cebca232add9a5375528ced54cb1fd8680ac",
        "0xccee8ce03f01e7fd51524aa2a822065ffddf1d59c23d07efc558b7831add6ce5",
        "0x04df06cabf15c983748d6770121ea74e0d6d23bcd3b98f4097e61f0ca5dfc98d",
        "0x1dcaa67650c0b579dc0ea1bfc249453c4d922719994d18bc64e4e41496691ca3",
        "0xba854f6464a16e8060326c89afefec2ea7d75f8eec64d69016967b60234cd9a1",
        "0xbe7118f9810856de9717945e062cd65e83952df4681b7af2865f1fb86118c793",
        "0xbe98a99d65db6bd8a00a2308fd4144792c9bac1825467f2f7dc4b3860271574e",
        "0x9543a81ed68a51f0b545361264f53948d22c0cf03edc928e6895f648cc2019b2",
        "0xcfaccb21a8d569b2901810de2bbd3fa4e6328eed40e7a6f326137ccffdd1ca24",
        "0xddad59ab89e2978d5bff5e049849e39fcf9a27ae0b47ae550d466027789b132e",
        "0x0c2e8896ba87fc6fef80cc3bb3c86287ac06ef144757e5bfd54fc52cb594f55e",
        "0x0b10225a7edff17bc850260de5c21391969c49f09c7d503ca0df9c04ef2906fb",
        "0x73a499b6313ac02686df7b4947d5761eaf15ecdf7552c1a7ae24de31a71331a1",
        "0xc7266faeeff75197265ecaf5bdca64514e486f8ab4fd181ebda5264859840dd6",
        "0x1a83ab3998c61c5fd3d1ad6bf343f9a4d9bb14daddf190389808256b84e08f03",
        "0x580d60dd98033fc6bfa5ee412d70d0c097a382d10ba9269eaed7d3b05995480e",
        "0xb390cc69321ab0f52e9a577cbc1c73db67a37dc3633abcfa108aba285c0bcca6",
        "0x6036cb6369583e11c58d51cc7af0009fcd49a88587188f0380847823a965522a",
        "0xc12c3dd26a2a5aae9e2a628f987c159ef45a0bf0c7779df93269c3aba58a4e1c",
        "0x435e54f88cfa09db4bd4a50a6220cbf2647207570e4670e08efec7c276988a8a",
        "0x0cb8cfbeb07db098ea31ff46ab64f8526f8d3a3e86bb98bda1617a9c9a0f542b",
        "0x73da78a9ab7f62f5310f693ad8fee4c9189ab937833c94deb499fdeb87e18086",
        "0x7e3f6a73fc93d982f46e3f555ef5c04b5641c08943aaf6d44d34950d37fec547",
        "0x4987ce18f67c158abe5412995679bdecbd436e53ef904fcd3a53748c4ed97e2b",
        "0x3411a2fc9c8aad9696cbba0d83959115233d7bbea3951ba3b0fc24c46791fa98",
        "0x528643f48ab0475abc491808bd8f3b4efca5386ae9f405ca921f04b306e0d6ec",
        "0x2105494bd52e44f1f3b8e63697fccb93194fed8c49e0c012eb4ef6cb1238e772",
        "0x5c66329503c329aeee5152ff78bd84fc6079cedcb3aa25cc3572a41840708901",
        "0xe8fb82ee690c5cc8cb3223a36cb7a0ebacbceae17c65b95d75f9dea97841b59d"
    ],
    "baseFeePerGas": {
        "type": "BigNumber",
        "hex": "0x099402fcbf"
    },
    "_difficulty": {
        "type": "BigNumber",
        "hex": "0x00"
    }
}
*/
