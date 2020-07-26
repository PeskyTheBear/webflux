CREATE TABLE IF NOT EXISTS message
(
    id      BIGSERIAL
        PRIMARY KEY,
    content TEXT NOT NULL
);;

CREATE OR REPLACE FUNCTION notify_event() RETURNS TRIGGER AS
$$
DECLARE
    payload JSON;
BEGIN
    payload = row_to_json(NEW);
    PERFORM pg_notify('message_notification', payload::text);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;;


DROP TRIGGER IF EXISTS notify_message ON message;;

CREATE TRIGGER notify_message
    AFTER INSERT OR UPDATE OR DELETE
    ON message
    FOR EACH ROW
EXECUTE PROCEDURE notify_event();;