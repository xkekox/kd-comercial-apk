const STORAGE_KEY = 'kd-comercial-mobile-records-v1';

const QUOTE_TABLE = {
    sacolas: {
        label: 'Sacolas Kraft',
        models: {
            'Sacola P': { 100: 1.40, 250: 1.33, 500: 1.26, 1000: 1.20 },
            'Sacola M': { 100: 1.65, 250: 1.58, 500: 1.51, 1000: 1.45 },
            'Sacola G': { 100: 1.70, 250: 1.63, 500: 1.56, 1000: 1.50 },
            'Sacola GG': { 100: 1.75, 250: 1.68, 500: 1.61, 1000: 1.55 }
        }
    },
    salgados: {
        label: 'Caixas para Salgados',
        models: {
            'Salgado PP': { 100: 1.49, 250: 1.42, 500: 1.35, 1000: 1.29 },
            'Salgado P': { 100: 1.67, 250: 1.60, 500: 1.53, 1000: 1.47 },
            'Salgado M': { 100: 1.90, 250: 1.83, 500: 1.76, 1000: 1.70 },
            'Salgado G': { 100: 2.12, 250: 2.05, 500: 1.98, 1000: 1.92 }
        }
    },
    pizzas: {
        label: 'Caixas de Pizza',
        models: {
            'Pizza 25cm': { 100: 1.67, 250: 1.60, 500: 1.53, 1000: 1.47 },
            'Pizza 30cm': { 100: 2.00, 250: 1.93, 500: 1.86, 1000: 1.80 },
            'Pizza 35cm': { 100: 2.12, 250: 2.05, 500: 1.98, 1000: 1.92 },
            'Pizza 40cm': { 100: 2.40, 250: 2.33, 500: 2.26, 1000: 2.20 }
        }
    },
    especiais: {
        label: 'Caixas Especiais',
        models: {
            'Caixa Peixe': { 100: 2.17, 250: 2.10, 500: 2.03, 1000: 1.97 },
            'Caixa Frango': { 100: 2.12, 250: 2.05, 500: 1.98, 1000: 1.92 },
            'Caixa Tenis': { 100: 2.26, 250: 2.19, 500: 2.12, 1000: 2.06 }
        }
    }
};

const SUPPLIER_COST_TABLE = {
    sacolas: {
        'Sacola P': { 100: 1.12, 250: 1.06, 500: 1.01, 1000: 0.96 },
        'Sacola M': { 100: 1.32, 250: 1.26, 500: 1.21, 1000: 1.16 },
        'Sacola G': { 100: 1.36, 250: 1.30, 500: 1.25, 1000: 1.20 },
        'Sacola GG': { 100: 1.40, 250: 1.34, 500: 1.29, 1000: 1.24 }
    },
    salgados: {
        'Salgado PP': { 100: 1.19, 250: 1.14, 500: 1.08, 1000: 1.03 },
        'Salgado P': { 100: 1.34, 250: 1.28, 500: 1.22, 1000: 1.18 },
        'Salgado M': { 100: 1.52, 250: 1.46, 500: 1.41, 1000: 1.36 },
        'Salgado G': { 100: 1.70, 250: 1.64, 500: 1.58, 1000: 1.54 }
    },
    pizzas: {
        'Pizza 25cm': { 100: 1.34, 250: 1.28, 500: 1.22, 1000: 1.18 },
        'Pizza 30cm': { 100: 1.60, 250: 1.54, 500: 1.49, 1000: 1.44 },
        'Pizza 35cm': { 100: 1.70, 250: 1.64, 500: 1.58, 1000: 1.54 },
        'Pizza 40cm': { 100: 1.92, 250: 1.86, 500: 1.81, 1000: 1.76 }
    },
    especiais: {
        'Caixa Peixe': { 100: 1.74, 250: 1.68, 500: 1.62, 1000: 1.58 },
        'Caixa Frango': { 100: 1.70, 250: 1.64, 500: 1.58, 1000: 1.54 },
        'Caixa Tenis': { 100: 1.81, 250: 1.75, 500: 1.70, 1000: 1.65 }
    }
};

const SCREEN_FEE = 90;

const state = {
    quoteItems: [],
    records: loadRecords(),
    lastQuote: null,
    editingId: null
};

const elements = {
    tabs: Array.from(document.querySelectorAll('[data-tab-target]')),
    panels: Array.from(document.querySelectorAll('[data-tab]')),
    customerName: document.getElementById('customerName'),
    category: document.getElementById('category'),
    model: document.getElementById('model'),
    customModelName: document.getElementById('customModelName'),
    customUnitPrice: document.getElementById('customUnitPrice'),
    quantity: document.getElementById('quantity'),
    deliveryMode: document.getElementById('deliveryMode'),
    freightValue: document.getElementById('freightValue'),
    freeFreightManaus: document.getElementById('freeFreightManaus'),
    addItem: document.getElementById('addItem'),
    clearItems: document.getElementById('clearItems'),
    generateQuote: document.getElementById('generateQuote'),
    items: document.getElementById('items'),
    supplierCost: document.getElementById('supplierCost'),
    autoSupplierCost: document.getElementById('autoSupplierCost'),
    receivedAmount: document.getElementById('receivedAmount'),
    repassedAmount: document.getElementById('repassedAmount'),
    paymentMethod: document.getElementById('paymentMethod'),
    leadSource: document.getElementById('leadSource'),
    supplierName: document.getElementById('supplierName'),
    status: document.getElementById('status'),
    nextFollowUpAt: document.getElementById('nextFollowUpAt'),
    lastContactAt: document.getElementById('lastContactAt'),
    notes: document.getElementById('notes'),
    saveRecord: document.getElementById('saveRecord'),
    duplicateQuote: document.getElementById('duplicateQuote'),
    cancelEditing: document.getElementById('cancelEditing'),
    quoteOutput: document.getElementById('quoteOutput'),
    recordsList: document.getElementById('recordsList'),
    exportJson: document.getElementById('exportJson'),
    metricRevenue: document.getElementById('metricRevenue'),
    metricProfit: document.getElementById('metricProfit'),
    metricCustomerPending: document.getElementById('metricCustomerPending'),
    metricSupplierPending: document.getElementById('metricSupplierPending'),
    metricOrders: document.getElementById('metricOrders'),
    metricAverage: document.getElementById('metricAverage'),
    metricMargin: document.getElementById('metricMargin'),
    metricFollowUp: document.getElementById('metricFollowUp'),
    topProducts: document.getElementById('topProducts'),
    customerBalances: document.getElementById('customerBalances'),
    editingBanner: document.getElementById('editingBanner')
};

function money(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(Number(value) || 0);
}

function loadRecords() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

function persistRecords() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.records));
}

function getTierBase(quantity) {
    if (quantity >= 1000) return 1000;
    if (quantity > 250) return 500;
    if (quantity > 100) return 250;
    return 100;
}

function populateCategories() {
    elements.category.innerHTML = Object.entries(QUOTE_TABLE)
        .map(([key, category]) => `<option value="${key}">${category.label}</option>`)
        .join('');
    populateModels();
}

function populateModels() {
    const category = QUOTE_TABLE[elements.category.value];
    if (!category) return;
    elements.model.innerHTML = Object.keys(category.models)
        .map((model) => `<option value="${model}">${model}</option>`)
        .join('');
}

function normalizeItem(rawItem, forcedTier = null) {
    const categoryKey = rawItem.categoryKey;
    const category = QUOTE_TABLE[categoryKey];
    const modelKey = (rawItem.customModelName || rawItem.modelKey || '').trim();
    const quantity = Number(rawItem.quantity) || 0;
    const customUnitPrice = Number(rawItem.customUnitPrice) || 0;
    if (!category || !modelKey || quantity <= 0) return null;

    const tier = forcedTier || getTierBase(quantity);
    const unitPrice = rawItem.customModelName
        ? customUnitPrice
        : category.models[modelKey]?.[tier];
    if (!unitPrice) return null;

    const supplierUnitCost = SUPPLIER_COST_TABLE[categoryKey]?.[modelKey]?.[tier] || 0;
    return {
        categoryKey,
        categoryLabel: category.label,
        modelKey,
        quantity,
        tierBase: tier,
        unitPrice,
        subtotal: Number((unitPrice * quantity).toFixed(2)),
        supplierUnitCost,
        supplierSubtotal: Number((supplierUnitCost * quantity).toFixed(2)),
        hasCustomModel: Boolean(rawItem.customModelName)
    };
}

function buildQuote() {
    const rawItems = state.quoteItems.length ? state.quoteItems : [{
        categoryKey: elements.category.value,
        modelKey: elements.model.value,
        customModelName: elements.customModelName.value.trim(),
        customUnitPrice: Number(elements.customUnitPrice.value),
        quantity: Number(elements.quantity.value)
    }];
    const totalQuantity = rawItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    const forcedTier = rawItems.length > 1 ? getTierBase(totalQuantity) : null;
    const items = rawItems.map((item) => normalizeItem(item, forcedTier)).filter(Boolean);
    if (!elements.customerName.value.trim() || !items.length) return null;

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const hasBoxes = items.some((item) => item.categoryKey !== 'sacolas');
    const totalBoxQuantity = items
        .filter((item) => item.categoryKey !== 'sacolas')
        .reduce((sum, item) => sum + item.quantity, 0);
    const screenFee = hasBoxes && totalBoxQuantity < 250 ? SCREEN_FEE : 0;
    const freight = Number(elements.freightValue.value) || 0;
    const total = Number((subtotal + screenFee + freight).toFixed(2));
    const autoSupplierCost = Number(items.reduce((sum, item) => sum + item.supplierSubtotal, 0).toFixed(2));

    const lines = [
        'KD Embalagens',
        `Cliente: ${elements.customerName.value.trim()}`,
        '',
        'ITENS',
        ...items.map((item, index) => `${index + 1}. ${item.modelKey} | ${item.quantity} un | ${money(item.subtotal)}`),
        '',
        `Subtotal: ${money(subtotal)}`,
        `Tela: ${screenFee > 0 ? money(screenFee) : 'gratis'}`,
        `Frete: ${freight > 0 ? money(freight) : 'retirada pelo cliente'}`,
        `Total: ${money(total)}`,
        `Entrada 50%: ${money(total / 2)}`
    ];

    return {
        customerName: elements.customerName.value.trim(),
        deliveryMode: elements.deliveryMode.value,
        freeFreightManaus: elements.freeFreightManaus.checked,
        freight,
        total,
        depositAmount: Number((total / 2).toFixed(2)),
        autoSupplierCost,
        items,
        text: lines.join('\n')
    };
}

function renderItems() {
    if (!state.quoteItems.length) {
        elements.items.innerHTML = '<div class="item"><strong>Nenhum item</strong><div class="meta">Adicione produtos para montar o pedido.</div></div>';
        return;
    }

    elements.items.innerHTML = state.quoteItems.map((item, index) => `
        <div class="item">
            <strong>${item.customModelName || item.modelKey}</strong>
            <div class="meta">${QUOTE_TABLE[item.categoryKey]?.label || ''} | ${item.quantity} un</div>
            <button type="button" data-remove-item="${index}">Remover</button>
        </div>
    `).join('');

    elements.items.querySelectorAll('[data-remove-item]').forEach((button) => {
        button.addEventListener('click', () => {
            state.quoteItems.splice(Number(button.dataset.removeItem), 1);
            renderItems();
        });
    });
}

function renderRecords() {
    if (!state.records.length) {
        elements.recordsList.innerHTML = '<div class="item"><strong>Sem registros</strong><div class="meta">Salve o primeiro pedido para começar.</div></div>';
        return;
    }

    const sorted = [...state.records].sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)));
    elements.recordsList.innerHTML = sorted.map((record) => `
        <div class="item">
            <strong>${record.customerName}</strong>
            <div class="meta">${record.status} | Venda ${money(record.quote.total)} | Lucro ${money(record.profit)}</div>
            <div class="meta">Receber ${money(record.customerPendingAmount)} | Fornecedor ${money(record.supplierPendingAmount)}</div>
            <button type="button" data-edit-record="${record.id}">Editar</button>
            <button type="button" data-delete-record="${record.id}">Apagar</button>
        </div>
    `).join('');

    elements.recordsList.querySelectorAll('[data-edit-record]').forEach((button) => {
        button.addEventListener('click', () => loadRecord(button.dataset.editRecord));
    });
    elements.recordsList.querySelectorAll('[data-delete-record]').forEach((button) => {
        button.addEventListener('click', () => {
            state.records = state.records.filter((item) => item.id !== button.dataset.deleteRecord);
            persistRecords();
            renderRecords();
            renderDashboard();
        });
    });
}

function renderDashboard() {
    const revenue = state.records.reduce((sum, item) => sum + item.quote.total, 0);
    const profit = state.records.reduce((sum, item) => sum + item.profit, 0);
    const customerPending = state.records.reduce((sum, item) => sum + item.customerPendingAmount, 0);
    const supplierPending = state.records.reduce((sum, item) => sum + item.supplierPendingAmount, 0);
    const average = state.records.length ? revenue / state.records.length : 0;
    const margin = state.records.length
        ? state.records.reduce((sum, item) => sum + item.marginPercent, 0) / state.records.length
        : 0;
    const today = new Date().toISOString().slice(0, 10);
    const followUps = state.records.filter((item) => item.nextFollowUpAt && item.nextFollowUpAt <= today);

    elements.metricRevenue.textContent = money(revenue);
    elements.metricProfit.textContent = money(profit);
    elements.metricCustomerPending.textContent = money(customerPending);
    elements.metricSupplierPending.textContent = money(supplierPending);
    elements.metricOrders.textContent = String(state.records.length);
    elements.metricAverage.textContent = money(average);
    elements.metricMargin.textContent = `${margin.toFixed(2)}%`;
    elements.metricFollowUp.textContent = String(followUps.length);

    const productMap = {};
    state.records.forEach((record) => {
        record.quote.items.forEach((item) => {
            if (!productMap[item.modelKey]) {
                productMap[item.modelKey] = { quantity: 0, revenue: 0 };
            }
            productMap[item.modelKey].quantity += item.quantity;
            productMap[item.modelKey].revenue += item.subtotal;
        });
    });
    const topProducts = Object.entries(productMap).sort((a, b) => b[1].revenue - a[1].revenue).slice(0, 6);
    elements.topProducts.innerHTML = topProducts.length
        ? topProducts.map(([name, stats]) => `<div class="item"><strong>${name}</strong><div class="meta">${stats.quantity} un | ${money(stats.revenue)}</div></div>`).join('')
        : '<div class="item"><strong>Sem produtos</strong><div class="meta">Salve registros para gerar ranking.</div></div>';

    const balances = state.records
        .filter((item) => item.customerPendingAmount > 0)
        .sort((a, b) => b.customerPendingAmount - a.customerPendingAmount)
        .slice(0, 6);
    elements.customerBalances.innerHTML = balances.length
        ? balances.map((item) => `<div class="item"><strong>${item.customerName}</strong><div class="meta">Receber ${money(item.customerPendingAmount)} | Status ${item.status}</div></div>`).join('')
        : '<div class="item"><strong>Sem cobranca pendente</strong><div class="meta">Os saldos de clientes aparecem aqui.</div></div>';
}

function resetEditing() {
    state.editingId = null;
    elements.editingBanner.classList.add('hidden');
    elements.editingBanner.textContent = '';
    elements.cancelEditing.classList.add('hidden');
    elements.saveRecord.textContent = 'Salvar registro';
}

function clearForm() {
    elements.customerName.value = '';
    elements.customModelName.value = '';
    elements.customUnitPrice.value = '';
    elements.quantity.value = '';
    elements.freightValue.value = '';
    elements.freeFreightManaus.checked = false;
    elements.supplierCost.value = '';
    elements.autoSupplierCost.value = '';
    elements.receivedAmount.value = '';
    elements.repassedAmount.value = '';
    elements.supplierName.value = '';
    elements.notes.value = '';
    elements.nextFollowUpAt.value = '';
    elements.lastContactAt.value = '';
    elements.quoteOutput.textContent = '';
    state.lastQuote = null;
    state.quoteItems = [];
    renderItems();
}

function loadRecord(id) {
    const record = state.records.find((item) => item.id === id);
    if (!record) return;

    state.editingId = id;
    elements.editingBanner.classList.remove('hidden');
    elements.editingBanner.textContent = `Editando ${record.customerName}`;
    elements.cancelEditing.classList.remove('hidden');
    elements.saveRecord.textContent = 'Atualizar registro';

    elements.customerName.value = record.customerName;
    elements.deliveryMode.value = record.quote.deliveryMode;
    elements.freightValue.value = record.quote.freight || '';
    elements.freeFreightManaus.checked = Boolean(record.quote.freeFreightManaus);
    elements.supplierCost.value = record.supplierCost;
    elements.autoSupplierCost.value = money(record.autoSupplierCost);
    elements.receivedAmount.value = record.receivedAmount || '';
    elements.repassedAmount.value = record.repassedAmount || '';
    elements.paymentMethod.value = record.paymentMethod;
    elements.leadSource.value = record.leadSource;
    elements.supplierName.value = record.supplierName || '';
    elements.status.value = record.status;
    elements.nextFollowUpAt.value = record.nextFollowUpAt || '';
    elements.lastContactAt.value = record.lastContactAt || '';
    elements.notes.value = record.notes || '';
    elements.quoteOutput.textContent = record.quote.text;
    state.lastQuote = record.quote;
    state.quoteItems = record.quote.items.map((item) => ({
        categoryKey: item.categoryKey,
        categoryLabel: item.categoryLabel,
        modelKey: item.modelKey,
        customModelName: item.hasCustomModel ? item.modelKey : '',
        customUnitPrice: item.hasCustomModel ? item.unitPrice : 0,
        quantity: item.quantity
    }));
    renderItems();
}

function saveRecord() {
    if (!state.lastQuote) return;

    const supplierCost = Number(elements.supplierCost.value) || state.lastQuote.autoSupplierCost || 0;
    const receivedAmount = Number(elements.receivedAmount.value) || 0;
    const repassedAmount = Number(elements.repassedAmount.value) || 0;
    const profit = Number((state.lastQuote.total - supplierCost).toFixed(2));
    const marginPercent = state.lastQuote.total > 0
        ? Number(((profit / state.lastQuote.total) * 100).toFixed(2))
        : 0;

    const record = {
        id: state.editingId || `kd-mobile-${Date.now()}`,
        createdAt: state.editingId
            ? (state.records.find((item) => item.id === state.editingId)?.createdAt || new Date().toISOString())
            : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        customerName: state.lastQuote.customerName,
        status: elements.status.value,
        quote: state.lastQuote,
        supplierCost,
        autoSupplierCost: state.lastQuote.autoSupplierCost,
        manualSupplierCost: supplierCost,
        profit,
        marginPercent,
        depositAmount: state.lastQuote.depositAmount,
        notes: elements.notes.value.trim(),
        receivedAmount,
        paymentMethod: elements.paymentMethod.value,
        receiptNotes: '',
        leadSource: elements.leadSource.value,
        supplierName: elements.supplierName.value.trim(),
        repassedAmount,
        customerPendingAmount: Number((state.lastQuote.total - receivedAmount).toFixed(2)),
        supplierPendingAmount: Number((supplierCost - repassedAmount).toFixed(2)),
        nextFollowUpAt: elements.nextFollowUpAt.value,
        lastContactAt: elements.lastContactAt.value
    };

    if (state.editingId) {
        state.records = state.records.map((item) => item.id === state.editingId ? record : item);
    } else {
        state.records.push(record);
    }

    persistRecords();
    renderRecords();
    renderDashboard();
    loadRecord(record.id);
}

function exportJson() {
    const blob = new Blob([JSON.stringify(state.records, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'kd-comercial-mobile-records.json';
    anchor.click();
    URL.revokeObjectURL(url);
}

function switchTab(target) {
    elements.tabs.forEach((button) => button.classList.toggle('active', button.dataset.tabTarget === target));
    elements.panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.tab === target));
}

elements.tabs.forEach((button) => {
    button.addEventListener('click', () => switchTab(button.dataset.tabTarget));
});

elements.category.addEventListener('change', populateModels);

elements.addItem.addEventListener('click', () => {
    const quantity = Number(elements.quantity.value);
    const modelKey = elements.customModelName.value.trim() || elements.model.value;
    if (!quantity || !modelKey) return;

    state.quoteItems.push({
        categoryKey: elements.category.value,
        categoryLabel: QUOTE_TABLE[elements.category.value]?.label || '',
        modelKey: elements.model.value,
        customModelName: elements.customModelName.value.trim(),
        customUnitPrice: Number(elements.customUnitPrice.value),
        quantity
    });
    elements.customModelName.value = '';
    elements.customUnitPrice.value = '';
    elements.quantity.value = '';
    renderItems();
});

elements.clearItems.addEventListener('click', () => {
    state.quoteItems = [];
    renderItems();
});

elements.generateQuote.addEventListener('click', () => {
    const quote = buildQuote();
    if (!quote) {
        elements.quoteOutput.textContent = 'Preencha cliente e itens validos.';
        return;
    }
    state.lastQuote = quote;
    elements.autoSupplierCost.value = money(quote.autoSupplierCost);
    elements.quoteOutput.textContent = quote.text;
});

elements.saveRecord.addEventListener('click', saveRecord);
elements.exportJson.addEventListener('click', exportJson);
elements.cancelEditing.addEventListener('click', () => {
    resetEditing();
    clearForm();
});
elements.duplicateQuote.addEventListener('click', async () => {
    if (!state.lastQuote?.text) return;
    await navigator.clipboard.writeText(state.lastQuote.text);
});

populateCategories();
renderItems();
renderRecords();
renderDashboard();
