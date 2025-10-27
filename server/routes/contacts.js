import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Caminho para o arquivo de contatos
const contactsPath = path.join(__dirname, '../data/contacts.json');

// Função para ler contatos
const readContacts = () => {
  try {
    const data = fs.readFileSync(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler contatos:', error);
    return [];
  }
};

// Função para salvar contatos
const saveContacts = (contacts) => {
  try {
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
    return true;
  } catch (error) {
    console.error('Erro ao salvar contatos:', error);
    return false;
  }
};

// POST - Salvar novo contato
router.post('/', (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validação básica
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email inválido'
      });
    }

    // Ler contatos existentes
    const contacts = readContacts();

    // Criar novo contato
    const newContact = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    // Adicionar ao array
    contacts.push(newContact);

    // Salvar
    if (saveContacts(contacts)) {
      console.log(`Novo contato salvo: ${name} (${email})`);
      res.json({
        success: true,
        message: 'Mensagem enviada com sucesso!',
        contact: newContact
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }

  } catch (error) {
    console.error('Erro ao processar contato:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// GET - Listar todos os contatos (para administração)
router.get('/', (req, res) => {
  try {
    const contacts = readContacts();
    res.json({
      success: true,
      contacts: contacts,
      total: contacts.length
    });
  } catch (error) {
    console.error('Erro ao listar contatos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// GET - Contato por ID
router.get('/:id', (req, res) => {
  try {
    const contacts = readContacts();
    const contact = contacts.find(c => c.id === req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contato não encontrado'
      });
    }

    res.json({
      success: true,
      contact: contact
    });
  } catch (error) {
    console.error('Erro ao buscar contato:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// PUT - Atualizar status do contato
router.put('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const contacts = readContacts();
    const contactIndex = contacts.findIndex(c => c.id === req.params.id);
    
    if (contactIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Contato não encontrado'
      });
    }

    contacts[contactIndex].status = status;
    contacts[contactIndex].updatedAt = new Date().toISOString();

    if (saveContacts(contacts)) {
      res.json({
        success: true,
        message: 'Status atualizado com sucesso',
        contact: contacts[contactIndex]
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  } catch (error) {
    console.error('Erro ao atualizar contato:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// DELETE - Remover contato
router.delete('/:id', (req, res) => {
  try {
    const contacts = readContacts();
    const contactIndex = contacts.findIndex(c => c.id === req.params.id);
    
    if (contactIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Contato não encontrado'
      });
    }

    const deletedContact = contacts.splice(contactIndex, 1)[0];

    if (saveContacts(contacts)) {
      res.json({
        success: true,
        message: 'Contato removido com sucesso',
        contact: deletedContact
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  } catch (error) {
    console.error('Erro ao remover contato:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;


