const {
	MessageType,
	Presence,
	mentionedJid
} = require('@adiwajshing/baileys')
const fs = require('fs-extra')
const { getBuffer } = require('../lib/functions')
const { color, bgcolor, LogZ } = require('../lib/color')

module.exports = welcome = async (geps, anu) => {
    try {
           if (anu.action == 'add') {
           if (anu.participants[0] === geps.user.jid){
           geps.updatePresence(anu.jid, Presence.composing)
           const buttons = [
           {buttonId: `.menu`, buttonText: {displayText: '𝐌𝐄𝐍𝐔'}, type: 1}
           ]
           const buttonMessage = {
           headerType: "IMAGE",
           contentText: `Halo! Terima Kasih Sudah Mengundangku, Jika Ingin Menggunakan Bot Ketik #menu`,
           footerText: `Hallo Semuaa 👋`,
           buttons: buttons,
           headerType: 1
           }
           await geps.sendMessage(anu.jid, buttonMessage, MessageType.buttonsMessage)
           }}

           if (anu.action == 'promote') {
           mdata = await geps.groupMetadata(anu.jid)
           num = anu.participants[0]
           console.log(anu)
           teks = `─ 「 *PROMOTE DETECT* 」 ─\n\n`
           teks += `⬡ *USER :* @${num.split('@')[0]}\n`
           teks += `⬡ *NOMOR :* ${num.replace('@s.whatsapp.net', '')}\n`
           teks += `⬡ *GRUP :* ${mdata.subject}`
           const buttons = [{buttonId: ' ', buttonText: {displayText: 'SELAMAT 🎉'}, type: 1}]
           const buttonMessage = {
           headerType: "IMAGE",
           contentText: teks,
           footerText: 'Cieee Jadi Admin 🎉',
           buttons: buttons,
           headerType: 1
           }
           await geps.sendMessage(mdata.id, buttonMessage, MessageType.buttonsMessage, {contextInfo: {"mentionedJid": [num]}
           })
           } else if (anu.action == 'demote') {
           mdata = await geps.groupMetadata(anu.jid)
           num = anu.participants[0]
           console.log(anu)
           teks = `─ 「 *DEMOTE DETECT* 」 ─\n\n`
           teks += `⬡ *USER :* @${num.split('@')[0]}\n`
           teks += `⬡ *NOMOR :* ${num.replace('@s.whatsapp.net', '')}\n`
           teks += `⬡ *GRUP :* ${mdata.subject}`
           const buttons = [{buttonId: ' ', buttonText: {displayText: 'SELAMAT 🎉'}, type: 1}]
           const buttonMessage = {
           headerType: "IMAGE",
           contentText: teks,
           footerText: 'Yang Sabar Yaaa 💪',
           buttons: buttons,
           headerType: 1
           }
           await geps.sendMessage(mdata.id, buttonMessage, MessageType.buttonsMessage, {contextInfo: {"mentionedJid": [num]}})
           }

           if (!JSON.parse(fs.readFileSync('./database/group/welcome.json')).includes(anu.jid)) return
           if (anu.action == 'add') {
           mdata = await geps.groupMetadata(anu.jid)
           num = anu.participants[0]
           console.log(anu)
           try {
           var EzEz = await geps.getProfilePicture(`${num.split('@')[0]}@c.us`)
           } catch {
           var EzEz = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
           }
           memeg = mdata.participants.length
           teks = `*Hai @${num.split('@')[0]} 👋*\n`
           teks += `*❑ Welcome In Group :*\n`
           teks += `*├─ ${mdata.subject}*\n`
           teks += `*├─ Intro Dulu Kak*\n`
           teks += `*├─ ❑ Nama :*\n`
           teks += `*├─ ❑ Umur :*\n`
           teks += `*├─ ❑ Hobi :*\n`
           teks += `*├─ ❑ Asal Kota :*\n`
           teks += `*└─ ❑ Jenis Kelamin :*`
           buffer = await getBuffer(`https://hadi-api.herokuapp.com/api/card/welcome?nama=${num.split('@')[0]}&descriminator=404&memcount=${memeg} &gcname=${encodeURI(mdata.subject)}&pp=${EzEz}&bg=https://i.ibb.co/WxxrPSg/03361b81d843.jpg`)
           const gambra = await geps.prepareMessage(mdata.id, buffer, MessageType.image)
           const buttonsss = [
           {buttonId: ` `, buttonText: {displayText: 'SELAMAT DATANG 👋'}, type: 1},
            ]
           const buttonsMessage = {
           contentText: teks,
           buttons: buttonsss,
           footerText: `Semoga Betah Yha~~`,
           headerType: 4,
           imageMessage: gambra.message.imageMessage
           }
           await geps.sendMessage(mdata.id, buttonsMessage, MessageType.buttonsMessage, {contextInfo: {"mentionedJid": [num]}})
           } else if (anu.action == 'remove') {
           mdata = await geps.groupMetadata(anu.jid)
           num = anu.participants[0]
           console.log(anu)
           try {        
           var EzEz = await geps.getProfilePicture(`${num.split('@')[0]}@c.us`)
           } catch {
           var EzEz = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
           }
           memeg = mdata.participants.length
           tekss = `Selamat Tinggal *@${num.split('@')[0]}* 👋`
           bufer = await getBuffer(`https://hadi-api.herokuapp.com/api/card/goodbye?nama=${num.split('@')[0]}&descriminator=404&memcount=${memeg} &gcname=${encodeURI(mdata.subject)}&pp=${EzEz}&bg=https://i.ibb.co/WxxrPSg/03361b81d843.jpg`)
           const gambraa = await geps.prepareMessage(mdata.id, bufer, MessageType.image)
           const buttonss = [
           {buttonId: ` `, buttonText: {displayText: 'Goodbye\n\nDia temenku guys, Kita berteman udah lama, gak tau kenapa tiba2 Keluar grup 😭'}, type: 1},
           ]
           const buttonsMessagee = {
           contentText: tekss,
           buttons: buttonss,
           footerText: `Beban Group Keluar~~`,
           headerType: 4,
           imageMessage: gambraa.message.imageMessage
           }
           await geps.sendMessage(mdata.id, buttonsMessagee, MessageType.buttonsMessage, {contextInfo: {"mentionedJid": [num]}})
           }
            
} catch (e){
console.log(e)
}
}
