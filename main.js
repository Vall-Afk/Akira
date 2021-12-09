const {
	WAConnection: _WAConnection,
	MessageType,
	Presence,
	mentionedJid
} = require('@adiwajshing/baileys')
const simple = require('./lib/simple')
const WAConnection = simple.WAConnection(_WAConnection)
const fs = require('fs-extra')
const ms = require('parse-ms')
const figlet = require('figlet')
const { color, bgcolor } = require('./lib/color')
const { start } = require('./lib/functions')
const setting = JSON.parse(fs.readFileSync('./settings.json'));
const welcome = require('./message/group')
baterai = '?'
charging = 'unknown'
blocked = []

const sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms))
	}
	
require('./Layna.js')
nocache('./Layna.js', module => console.log(color(`${module} is now update!`,'greenyellow')))

const starts = async (geps = new WAConnection()) => {
	geps.logger.level = 'warn'
	geps.version = [2, 2140, 12]
	console.log('Starting bot...')
	console.log(color(figlet.textSync('LAYNA BOT', {
font: 'Standard',
horizontalLayout: 'default',
vertivalLayout: 'default',
width: 80,
whitespaceBreak: false
}), 'cyan'))
geps.on('qr', () => {
console.log(color('[','white'), color('!','red'), color(']','white'), color('QR KODE SIAP UNTUK DI SCAN'))
})
fs.existsSync('./session.json') && geps.loadAuthInfo('./session.json')
geps.on('connecting', () => {
})
geps.on('open', () => {
start('2', '\n')
})
await geps.connect({timeoutMs: 30 * 1000})
fs.writeFileSync('./session.json', JSON.stringify(geps.base64EncodedAuthInfo(), null, '\t'))

console.log(']', color('----------------', 'purple'), color(' CONNECTED ', 'green'), color('----------------', 'purple'), '[\n\n')

console.log('[', color('÷', 'red'), ']', color('Wa Version', 'yellow'), color(':', 'aqua'), `${geps.user.phone.wa_version}`)
console.log('[', color('÷', 'red'), ']', color('Os Version', 'yellow'), color(':', 'aqua'), `${geps.user.phone.os_version}`)
console.log('[', color('÷', 'red'), ']', color('Device', 'yellow'), color(':', 'aqua'), `${geps.user.phone.device_manufacturer}`)
console.log('[', color('÷', 'red'), ']', color('Model', 'yellow'), color(':', 'aqua'), `${geps.user.phone.device_model}`)
console.log('[', color('÷', 'red'), ']', color('MCC', 'yellow'), color(':', 'aqua'), `${geps.user.phone.mcc}`)
console.log('[', color('÷', 'red'), ']', color('MNC', 'yellow'), color(':', 'aqua'), `${geps.user.phone.mnc}`)
console.log('[', color('÷', 'red'), ']', color('Os Build Number', 'yellow'), color(':', 'aqua'), `${geps.user.phone.os_build_number}`)

console.log('\n\n]', color('----------------', 'purple'), color(' LAYNA-BOT ', 'green'), color('----------------', 'purple'), '[\n')

geps.on('ws-close', () => {
console.log(color('[ SYSTEM ]', 'red'), color('Koneksi terputus, mencoba menghubungkan kembali..', 'yellow'))
})
geps.on('close', async ({ reason, isReconnecting }) => {
console.log(color('[ SYSTEM ]', 'red'), color('Terputus, Alasan :' + reason + '\nMencoba mengkoneksi ulang :' + isReconnecting, 'yellow'))
if (!isReconnecting) {
console.log(color('[ SYSTEM ]', 'red'), color('Connect To Phone Rejected and Shutting Down.', 'yellow'))
}
})

//Baterai
geps.on('CB:action,,battery', json => {
	global.batteryLevelStr = json[2][0][1].value
global.batterylevel = parseInt(batteryLevelStr)
baterai = batterylevel
if (json[2][0][1].live == 'true') charging = true
if (json[2][0][1].live == 'false') charging = false
})
global.batrei = global.batrei ? global.batrei : []
geps.on('CB:action,,battery', json => {
const batteryLevelStr = json[2][0][1].value
const batterylevel = parseInt(batteryLevelStr)
global.batrei.push(batterylevel)
})

//Chat Update
geps.on('chat-update', async (mek) => {
	require('./Layna.js')(geps, mek)
	})

//Group Update
geps.on('group-participants-update', async (anu) => {
await welcome(geps, anu)
})

//Anti Delete
try {
geps.on('message-delete', async (m) => {
if (m.key.remoteJid == 'status@broadcast') return
function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}
const from = m.key.remoteJid
const isGroup = m.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? m.participant : m.key.remoteJid
const dataRevoke = JSON.parse(fs.readFileSync('./database/group/antidelete.json'))
const dataCtRevoke = JSON.parse(fs.readFileSync('./database/ct-revoked.json'))
const dataBanCtRevoke = JSON.parse(fs.readFileSync('./database/ct-revoked-banlist.json'))
const isRevoke = !isGroup ? true : isGroup ? dataRevoke.includes(from) : false
const isCtRevoke = isGroup ? true : dataCtRevoke.data ? true : false
const isBanCtRevoke = isGroup ? true : !dataBanCtRevoke.includes(sender) ? true : false
if (!isRevoke) return
if (!isCtRevoke) return
if (!isBanCtRevoke) return
if (m.key.fromMe) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
let d = new Date
let locale = 'id'
let calender = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
const type = Object.keys(m.message)[0]
let teks = `── 「 *ANTI DELETE* 」 ──

⬡ *DARI  : @${m.participant.split("@")[0]}*
⬡ *NOMOR  : ${m.participant.split("@")[0]}*
⬡ *TANGGAL  : ${calender}*`
if (isGroup) buttons = [{buttonId: `.antidelete mati`, buttonText: {displayText: 'DISABLE ANTIDELETE'}, type: 1}]
if (!isGroup) buttons = [{buttonId: `.antidelete ctmati`, buttonText: {displayText: 'DISABLE ANTIDELETE'}, type: 1}]
const buttonMessage = {
headerType: "IMAGE",
contentText: teks,
footerText: 'Loh, Kok Di Hapus..?',
buttons: buttons,
headerType: 1
}
await geps.sendMessage(m.key.remoteJid, buttonMessage, MessageType.buttonsMessage, {quoted: m.message, contextInfo: {mentionedJid: parseMention(teks)}})
geps.copyNForward(m.key.remoteJid, m.message)
})
} catch (e) {
console.log('Error : %s', color(e, 'red'))
}

//Anti Call
geps.on('CB:action,,call', async json => {
	const callerId = json[2][0][1].from;
geps.sendMessage(callerId, `*「 CALL DETECTED 」*\n\nMaaf, Kamu Telah Melanggar Rules Bot\n\nAuto Block System ~`, MessageType.text)
geps.sendMessage(`${setting.nomerowner}@s.whatsapp.net`, `*◯ PANGGILAN ◯*\n\nCalling Detected From @${callerId.split("@")[0]} >_<`, MessageType.text, { contextInfo: {"mentionedJid": [callerId]}})
await sleep(4000)
await geps.blockUser(callerId, "add")
})
geps.on('CB:Blocklist', json => {
if (blocked.length > 2) return
for (let i of json[1].blocklist) {
blocked.push(i.replace('c.us','s.whatsapp.net'))
}
})       
}
	
function nocache(module, cb = () => { }) {
	console.log(color('MODULE','white'), color(`'${module}'`,'greenyellow'))
fs.watchFile(require.resolve(module), async () => {
await uncache(require.resolve(module))
cb(module)
})
}

function uncache(module = '.') {
	return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(module)]
resolve()
} catch (e) {
reject(e)
}
})
}

starts()