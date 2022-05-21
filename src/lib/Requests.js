/*eslint-disable*/
const CryptoJS = require('crypto-js')

const host = 'http://80.78.244.159:3000'

export async function RequestPS (user, key, cmd) {       
  let err = 1
  try {
    const encryptedCmd = encrypt(cmd, key)
    let response = await request(user, encryptedCmd)
      
    console.log(response)
      err = 2
      response = textToXML(response)
      response = response.getElementsByTagName('User')

      err = 3
      const nodes = response[0].childNodes
      err = 4
      const obj = {};
      for (let ele=0; ele<nodes.length; ele++)
      {  
        let name = nodes[ele].tagName
        let value = nodes[ele].textContent
        if (name === 'UserID') {value = parseInt(value)}
        if (name === 'CardUpProcent') {value = parseFloat(value.replace(',','.'))}
        if (['secret','URLSBP','merchantId','client_id','SaitFNS',
            'OKATO','accountNumber'].includes(name))
        continue 
        obj[name] = value
      }
      return obj
  }
  catch(error)
  {
      return err
  }
}

export async function GetContent1 (user, key) {       
  let err = 1
  try {
      let response = await helloWorldTest(user)
      response = response.getElementsByTagName('HelloWorldTestResult')[0].textContent.replace(/&quot;/g,"'")
      err = 2
      const decrypted = decrypt(response, key)
      response = decrypted.toString(CryptoJS.enc.Utf8)
      
      err = 3
      response = textToXML(response)
      response = response.getElementsByTagName('User')

      err = 4
      const nodes = response[0].childNodes
      err = 5
      //const arr = []
      const obj = {};
      for (let ele=0; ele<nodes.length; ele++)
      {  
        let name = nodes[ele].tagName
        let value = nodes[ele].textContent
        if (name === 'UserID') {value = parseInt(value)}
        if (name === 'CardUpProcent') {value = parseFloat(value.replace(',','.'))}
        if (['secret','URLSBP','merchantId','client_id','SaitFNS',
            'OKATO','accountNumber'].includes(name))
        continue 
        obj[name] = value
      }
      //arr.push(obj);
      return obj
  }
  catch(error)
  {
      //alert(`Ошибка запроса пользователя!\nСтатус: ${error.status}\n${error.statusText}`);
      return err
  }
}

  export async function LoadArrayPS (user, key, cmd) {       
    try {
        const encryptedCmd = encrypt(cmd, key)
        let response = await request(user, encryptedCmd)
        response = textToXML(response)
        response = response.getElementsByTagName('Table')

        const arr = []
        for(let i=0; i<response.length; i++) 
        {  
            var obj = {};
            const nodes = response[i].attributes
            for (let ele=0; ele<nodes.length; ele++)
            {  
                let name = nodes[ele].name
                let value = nodes[ele].value
                obj[name] = value
            }
            arr.push(obj);
        } 
        return arr
    }
    catch(error)
    {
        alert(`Ошибка получения списка!\n`+ cmd +`\nСтатус: ${error.status}\n${error.statusText}`);
    }
  }

//----------------------- SOAP -------------------------------------
  export function cryptP(P) { return CryptoJS.MD5(P) }  
  
    export function encrypt(cmd, key) {
      const encrypted = CryptoJS.TripleDES.encrypt(CryptoJS.enc.Utf8.parse(cmd), key,
        { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
      )
      const base64Coded = CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
      return base64Coded
    }
    //------------------------
    export function decrypt(mes, key) {
      const base64Decoded = CryptoJS.enc.Base64.parse(mes);
      const decrypted = CryptoJS.TripleDES.decrypt({ciphertext: base64Decoded}, key, 
        { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
      )
      return decrypted.toString(CryptoJS.enc.Utf8)
    }
    
    export async function GetContent(url, key) {
      return new Promise( (resolve, reject) => {
            const xmlhttp = new XMLHttpRequest()
              xmlhttp.open('GET', host + url, true);
             
              xmlhttp.setRequestHeader('key', key);
  
              xmlhttp.onload = function() {
                //alert(`Загружено: ${xmlhttp.status} ${xmlhttp.response}`);
                if (this.status >= 200 && this.status < 300) {
                    //let response = xmlhttp.response.replace(/&lt;/g,'<')
                    //response = response.replace(/&gt;/g,'>')
                    resolve(xmlhttp.response);
                } else {                  
                    reject({
                      status: this.status,
                      statusText: 'onload err ' + xmlhttp.statusText,
                  })
                }            
              }
  
              xmlhttp.onerror = function() { 
                // происходит, только когда запрос совсем не получилось выполнить
                reject({
                  status: this.status,
                  statusText: 'onerror err ' + xmlhttp.statusText,
                })            
              }
              /*xmlhttp.onreadystatechange = (evt) => {
                  if (evt.currentTarget.readyState === 4 && evt.currentTarget.status === 200) {
                          resolve(evt.currentTarget.response);
                  }
              }*/
              xmlhttp.responseType = 'json'
              xmlhttp.send()
    })
  }

    export async function request(url, metod, data, key) {
        return new Promise( (resolve, reject) => {
              const xmlhttp = new XMLHttpRequest()
                xmlhttp.open(metod, host + url, true) 
               
                xmlhttp.setRequestHeader('key', key);
                xmlhttp.setRequestHeader('Content-Type', 'application/json');
        
                xmlhttp.onload = function() {
                  //alert(`Загружено: ${xmlhttp.status} ${xmlhttp.response}`);
                  if (this.status >= 200 && this.status < 300) {
                      resolve(xmlhttp.response);
                  } else {                  
                      reject({
                        status: this.status,
                        statusText: 'onload err ' + xmlhttp.statusText,
                    })
                  }            
                }
    
                xmlhttp.onerror = function() { 
                  // происходит, только когда запрос совсем не получилось выполнить
                  reject({
                    status: this.status,
                    statusText: 'onerror err ' + xmlhttp.statusText,
                  })            
                }
                xmlhttp.responseType = 'json'
                xmlhttp.send(data)
      })
    }
    
    export function textToXML(text) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text.toString(CryptoJS.enc.Utf8), "text/xml")
      return xmlDoc
    }
    
    export function xmlToText(xmlDoc) {
      return xmlDoc.documentElement.outerHTML
    }
  
    /*
    const serializer = new XMLSerializer();
    const sXML = serializer.serializeToString(xmlDoc)
    console.log(sXML)
    */
  
  