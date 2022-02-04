

const ACCEPTED_FILES = [
    { mime: 'image/png', extension: 'png', type: 'image', max: 2000000 },
    { mime: 'image/jpg', extension: 'jpg', type: 'image', max: 700000 },
    { mime: 'image/jpeg', extension: 'jpg', type: 'image', max: 2000000 },
];

module.exports = {



    store: function (files, prop = 'stream') {
        if (!files[prop]) {
            return {
                error: 'Arquivo não encontrado!'
            };
        }
        const hash = new Date().getTime();
        const day = new Date().getUTCDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();

        const file = ACCEPTED_FILES.filter(file => file.mime === files[prop].mimetype);

        if (files[prop].size > file[0].max) {
            return {
                error: 'Arquivo enviado é maior que o permitido para categoria!'
            };
        }

        if (file[0]) {
            files[prop].mv(`./public/storage/${file[0].type}/${year}/${month}/${day}/${hash}.${file[0].extension}`);

            return {
                error: null,
                hash,
                ...file[0],
                title: files[prop].name,
            };
        } else {
            return {
                error: 'Tipo de arquivo não é permido!'
            };
        }
    },


    several(files) {
        if (!files) {
            return {
                error: 'Arquivo não encontrado!'
            }
        }

        let resultFile = [];
        
        //validação dos arquivos:
        for (let j = 0; j < files.length; j++) {

            //cria o hash etc
            const hash = new Date().getTime() + j;
            const day = new Date().getUTCDate();
            const month = new Date().getMonth() + 1;
            const year = new Date().getFullYear();

            //cria instancia do arquivo
            const file = files[j];

            //detecta qual tipo de arquivo é:
            const exFile = ACCEPTED_FILES.find(fileItem => fileItem.mime === file.mimetype);

            if (!exFile) {
                return {
                    error: 'Tipo de arquivo não é permido!'
                };
            }

            //confere se o arquivo está ok para o limite e para a categoria/extensão;
            if (file.size > exFile.max) {
                return {
                    error: 'Arquivo enviado é maior que o permitido para categoria!'
                };
            }

            //move o arquivo para determinada pasta
            file.mv(`./public/storage/${exFile.type}/${year}/${month}/${day}/${hash}.${exFile.extension}`);

            resultFile.push({
                error: null,
                hash,
                ...exFile,
                title: file.name,
            })
        }

        return resultFile;
    }

}