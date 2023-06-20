CREATE SCHEMA personal_finances;

CREATE TABLE personal_finances.financial_release
(
    release_id SERIAL PRIMARY KEY,
    month TEXT,
    category TEXT,
    type TEXT,
    value NUMERIC
);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Janeiro', 'Salário', 'receita', 3000);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Janeiro', 'Aluguel', 'despesa', 1000);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Janeiro', 'Conta de Energia', 'despesa', 200);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Janeiro', 'Conta de Água', 'despesa', 100);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Janeiro', 'Internet', 'despesa', 100);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Janeiro', 'Transporte', 'despesa', 300);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Janeiro', 'Alimentação', 'despesa', 500);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Janeiro', 'Farmácia', 'despesa', 100);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Fevereiro', 'Salário', 'receita', 3000);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Fevereiro', 'Aluguel', 'despesa', 1000);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Fevereiro', 'Conta de Energia', 'despesa', 250);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Fevereiro', 'Conta de Água', 'despesa', 100);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Fevereiro', 'Internet', 'despesa', 100);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Fevereiro', 'Transporte', 'despesa', 300);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Fevereiro', 'Alimentação', 'despesa', 100);


insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Março', 'Salário', 'receita', 4000);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Março', 'Aluguel', 'despesa', 1000);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Março', 'Conta de Energia', 'despesa', 200);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Março', 'Conta de Água', 'despesa', 100);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Março', 'Internet', 'despesa', 100);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Março', 'Transporte', 'despesa', 300);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Março', 'Alimentação', 'despesa', 800);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Março', 'Lazer', 'despesa', 800);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Abril', 'Salário', 'receita', 3000);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Abril', 'Aluguel', 'despesa', 1000);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Abril', 'Conta de Energia', 'despesa', 230);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Abril', 'Conta de Água', 'despesa', 100);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Abril', 'Internet', 'despesa', 100);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Abril', 'Transporte', 'despesa', 300);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Abril', 'Alimentação', 'despesa', 500);

insert into personal_finances.financial_release
    (month, category, type, value)
values
    ('Abril', 'Farmácia', 'despesa', 100);