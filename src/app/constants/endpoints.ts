export const link = {
    // baseaddress: 'https://pacific-eyrie-42411.herokuapp.com/api',
    // login: 'https://pacific-eyrie-42411.herokuapp.com/login',
    // logout: 'https://pacific-eyrie-42411.herokuapp.com/logout',
    // baseaddress: 'http://localhost:9090/api',
    // login: 'http://localhost:9090/login',
    // logout: 'http://localhost:9090/logout'
    baseaddress: 'https://anagrambk.eu-de.mybluemix.net/api',
    login: 'https://anagrambk.eu-de.mybluemix.net/login',
    logout: 'https://anagrambk.eu-de.mybluemix.net/logout',
  };

  export const isGameTime = {
    apiUrl : link.baseaddress + '/anagram/isgametime'
  };
export const validateWord = {
  apiUrl : link.baseaddress + '/anagram/validateword/{word}'
}

export const fetchUserInfo = {
  apiUrl : link.baseaddress + '/anagram/fetchme'
}

export const getWord = {
  apiUrl : link.baseaddress + '/anagram/getword'
}

export const myWords = {
  apiUrl : link.baseaddress + '/anagram/mywords'
}

export const nextLevel = {
  apiUrl : link.baseaddress + '/anagram/nextlevel'
}

export const updateTime = {
  apiUrl: link.baseaddress + '/anagram/updatecount/{rem}'
}

export const fetchAllLevels = {
  apiUrl : link.baseaddress + '/anagram/alllevels'
}

export const getLevelWords = {
  apiUrl : link.baseaddress + '/anagram/getlevelwords/{level}'
}