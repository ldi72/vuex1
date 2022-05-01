/*eslint-disable*/

export const check_INN = (INNstring) =>
{
    // является ли вообще числом
    try { parseInt(INNstring); }
    catch { return false; }
    // проверка на 10 и 12 цифр
    if (INNstring.length != 10 && INNstring.length != 12) { return false; }

    // проверка по контрольным цифрам
    if (INNstring.length == 10) // для юридического лица
    {
        let dgt10 = 0;
        try
        {
            dgt10 = (((2 * parseInt(INNstring[0])
                + 4 * parseInt(INNstring[1])
                + 10 * parseInt(INNstring[2])
                + 3 * parseInt(INNstring[3])
                + 5 * parseInt(INNstring[4])
                + 9 * parseInt(INNstring[5])
                + 4 * parseInt(INNstring[6])
                + 6 * parseInt(INNstring[7])
                + 8 * parseInt(INNstring[8])) % 11) % 10);
        }
        catch { return false; }

        if (parseInt(INNstring[9]) == dgt10) { return true; }
        else { return false; }
    }
    else // для физического лица
    {
        let dgt11 = 0
        let dgt12 = 0
        try
        {
            dgt11 = (((
                7 * parseInt(INNstring[0])
                + 2 * parseInt(INNstring[1])
                + 4 * parseInt(INNstring[2])
                + 10 * parseInt(INNstring[3])
                + 3 * parseInt(INNstring[4])
                + 5 * parseInt(INNstring[5])
                + 9 * parseInt(INNstring[6])
                + 4 * parseInt(INNstring[7])
                + 6 * parseInt(INNstring[8])
                + 8 * parseInt(INNstring[9])) % 11) % 10);
                
            dgt12 = (((
                3 * parseInt(INNstring[0])
                + 7 * parseInt(INNstring[1])
                + 2 * parseInt(INNstring[2])
                + 4 * parseInt(INNstring[3])
                + 10 * parseInt(INNstring[4])
                + 3 * parseInt(INNstring[5])
                + 5 * parseInt(INNstring[6])
                + 9 * parseInt(INNstring[7])
                + 4 * parseInt(INNstring[8])
                + 6 * parseInt(INNstring[9])
                + 8 * parseInt(INNstring[10])) % 11) % 10);
        }
        catch { return false; }
        if (parseInt(INNstring[10]) == dgt11
            && parseInt(INNstring[11]) == dgt12) { return true; }
        else { return false; }
    }
}

