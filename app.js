// After deployment, paste the contract address printed by Hardhat here.
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";



const ABI = [
  "function owner() view returns (address)",
  "function electionActive() view returns (bool)",
  "function addCandidate(string name)",
  "function startElection()",
  "function stopElection()",
  "function vote(uint256 candidateId)",
  "function getCandidates() view returns (tuple(uint256 id,string name,uint256 voteCount)[])",
  "function hasVoted(address) view returns (bool)"
];

let provider, signer, contract, account;
let demoOtp = null;
let voterVerified = false;
let selectedCandidate = null;

const $ = id => document.getElementById(id);
function msg(el, text, ok=false){ el.textContent=text; el.style.color=ok ? "#16803c" : "#b42318"; }

async function connectWallet(){
  if(!window.ethereum){ alert("Please install MetaMask."); return; }
  if(CONTRACT_ADDRESS.includes("PASTE_")){ alert("First deploy the contract and paste its address into frontend/app.js."); return; }
provider = new ethers.BrowserProvider(window.ethereum, {
  chainId: 31337,
  name: "Hardhat Local"
});
  await provider.send("eth_requestAccounts",[]);
  signer = await provider.getSigner();
  account = await signer.getAddress();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  $("wallet").textContent = "Wallet: " + account;
  await refresh();
}

async function verifyAdmin(){
  if(!contract) return;
  const owner = await contract.owner();
  $("adminStatus").textContent = owner.toLowerCase() === account.toLowerCase() ? "Admin wallet" : "Voter wallet";
}

async function refresh(){
  if(!contract) return;
  const active = await contract.electionActive();
  $("electionStatus").textContent = "Election status: " + (active ? "ACTIVE" : "STOPPED");
  const list = await contract.getCandidates();

  $("candidates").innerHTML = list.map(c =>
    `<label class="candidate"><input type="radio" name="candidate" value="${c.id}"> <span>${escapeHtml(c.name)}</span></label>`
  ).join("") || "<p>No candidates added yet.</p>";

  document.querySelectorAll('input[name="candidate"]').forEach(r => {
    r.addEventListener("change", e => {
      selectedCandidate = Number(e.target.value);
      $("voteBtn").disabled = !voterVerified || !active;
    });
  });

  let max = 1;
  for(const c of list) max = Math.max(max, Number(c.voteCount));
  $("results").innerHTML = list.map(c => {
    const pct = Math.round(Number(c.voteCount)/max*100);
    return `<div class="result"><div class="result-line"><span>${escapeHtml(c.name)}</span><strong>${c.voteCount}</strong></div><div class="bar"><div class="fill" style="width:${pct}%"></div></div></div>`;
  }).join("") || "<p>No results yet.</p>";
  await verifyAdmin();
}

async function castVote(){
  if(!contract || selectedCandidate === null) return;
  if(!voterVerified){ msg($("voteStatus"),"Verify your voter identity first."); return; }
  try{
    $("voteBtn").disabled=true;
    msg($("voteStatus"),"Confirm the transaction in MetaMask…",true);
    const tx = await contract.vote(selectedCandidate);
    await tx.wait();
    msg($("voteStatus"),"Vote recorded successfully on blockchain.",true);
    await refresh();
  }catch(e){
    msg($("voteStatus"), e.shortMessage || e.reason || "Transaction failed.");
    $("voteBtn").disabled=false;
  }
}

$("connectBtn").onclick=connectWallet;

$("otpBtn").onclick=()=>{
  const voter=$("voterId").value.trim(), mobile=$("mobile").value.trim();
  if(!voter || !mobile){ msg($("verifyStatus"),"Enter Voter ID and mobile number."); return; }
  demoOtp = String(Math.floor(100000+Math.random()*900000));
  msg($("verifyStatus"),"Demo OTP: "+demoOtp,true);
};

$("verifyBtn").onclick=()=>{
  if(!demoOtp){ msg($("verifyStatus"),"Send OTP first."); return; }
  if($("otp").value.trim() !== demoOtp){ msg($("verifyStatus"),"Invalid OTP."); return; }
  voterVerified=true;
  msg($("verifyStatus"),"Voter verified successfully.",true);
  $("voteBtn").disabled = selectedCandidate === null;
};

$("voteBtn").onclick=castVote;

$("addCandidateBtn").onclick=async()=>{
  if(!contract)return alert("Connect MetaMask first.");
  try{const tx=await contract.addCandidate($("candidateName").value.trim());await tx.wait();$("candidateName").value="";msg($("adminMessage"),"Candidate added.",true);await refresh();}
  catch(e){msg($("adminMessage"),e.shortMessage||e.reason||"Admin transaction failed.");}
};

$("startBtn").onclick=async()=>{
  try{const tx=await contract.startElection();await tx.wait();msg($("adminMessage"),"Election started.",true);await refresh();}
  catch(e){msg($("adminMessage"),e.shortMessage||e.reason||"Could not start election.");}
};

$("stopBtn").onclick=async()=>{
  try{const tx=await contract.stopElection();await tx.wait();msg($("adminMessage"),"Election stopped.",true);await refresh();}
  catch(e){msg($("adminMessage"),e.shortMessage||e.reason||"Could not stop election.");}
};

$("refreshBtn").onclick=refresh;

function escapeHtml(s){
  return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}
